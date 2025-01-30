import { JWTAdapter } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prisma } from "../../data/postgres";
import { CustomError, RegisterUserDto } from "../../domain";

export class AuthService {
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
}
