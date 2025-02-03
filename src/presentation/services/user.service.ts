import { prisma } from "../../data/postgres";
import { CustomError, UserEntity } from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

export class UserService {
    contructor() {}

    async getUsers() {
        try {
            const users = await prisma.users.findMany();

            return users.map((u) => UserEntity.fromObject(u));
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async getUserById(id: number) {
        try {
            const user = await prisma.users.findUnique({ where: { id } });

            if (!user) {
                throw CustomError.notFound("User not found");
            }

            const { password, ...userEntity } = UserEntity.fromObject(user);

            return userEntity;
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async updateUser(user: UpdateUserDto) {
        // const
    }
}
