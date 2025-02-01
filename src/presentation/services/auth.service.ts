import { JWTAdapter } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prisma } from "../../data/postgres";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
    // DI
    constructor() {}

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

            const { password, ...userEntity } = UserEntity.fromObject(newUser);

            // Generate token
            const token = await JWTAdapter.generateToken({ id: newUser.id });
            if (!token) throw CustomError.internalServer("Error while generating token");

            return { user: userEntity, token };
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
}
