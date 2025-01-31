import { envs, JWTAdapter } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prisma } from "../../data/postgres";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
    constructor(public readonly emailService: EmailService) {}

    registerUser = async (registerDto: RegisterUserDto) => {
        const { email, password, name, lastName, phoneNumber } = registerDto;

        const existUser = await prisma.users.findFirst({
            where: {
                email,
            },
        });

        if (existUser) throw CustomError.badRequest(`User with email ${email} already exists`);

        try {
            // Encrypt the password
            let encryptPwd = await bcryptAdapter.hash(registerDto.password);

            // Create the user
            const newUser = await prisma.users.create({ data: { ...registerDto, password: encryptPwd } });

            const userEntity = UserEntity.fromObject(newUser);

            // Email Confirmation
            //TODO: Implement email confirmation

            // Generate token
            const token = await JWTAdapter.generateToken({ id: newUser.id });
            if (!token) throw CustomError.internalServer("Error while generating token");

            return { user: newUser, token };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("Internal server error");
        }
    };

    loginUser = async (loginDto: LoginUserDto) => {
        const { email, password } = loginDto;

        // Find the user
        const user = await prisma.users.findFirst({ where: { email } });

        if (!user) throw CustomError.badRequest("User not found");

        try {
            // Compare the password
            const passwordMatch = await bcryptAdapter.compare(password, user.password);

            if (!passwordMatch) throw CustomError.badRequest("Invalid credentials");

            // Generate token
            const token = await JWTAdapter.generateToken({ id: user.id });

            // Return the user and the token
            return { user, token };
        } catch (error) {
            CustomError.internalServer();
        }
    };

    private sendEmailValidationLink = async (user: UserEntity) => {
        const token = await JWTAdapter.generateToken({ id: user.id });
        if (!token) throw CustomError.internalServer("Error while generating token");

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        //TODO: Create the email template in a separate file
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${user.email}</a>
        `;

        const options = {
            to: user.email,
            subject: "Validate your email",
            htmlBody: html,
        };

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer("Error while sending email");

        return true;
    };

    public validateEmail = async (token: string) => {
        // Validate the token
        const payload = await JWTAdapter.validateToken(token);
        if (!payload) throw CustomError.unAuthorized("Invalid token");

        // Get the user id
        const { id } = payload as { id: number };
        if (!id) throw CustomError.internalServer("Email not in token");

        // Find the user
        const user = await prisma.users.findFirst({ where: { id } });
        if (!user) throw CustomError.badRequest("User not found");

        // Update the user
        await prisma.users.update({ data: { isVerified: true }, where: { id } });

        return true;
    };
}
