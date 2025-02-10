import { prisma } from "../../data/postgres";
import { CustomError, UserEntity } from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

type QueryParams = {
    email: string;
    name: string;
    activated: string;
};

export class UserService {
    contructor() {}

    async getUsers(query: Partial<QueryParams>) {
        const { name, activated = "true", email } = query;

        try {
            const isActived = activated === "true" ? true : false;

            const users = await prisma.users.findMany({
                where: {
                    email: { contains: email, mode: "insensitive" },
                    name: { contains: name, mode: "insensitive" },
                    isActived: isActived,
                },
            });

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

            const userEntity = UserEntity.fromObject(user);

            return userEntity;
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async updateUser(userDto: UpdateUserDto) {
        try {
            const user = await prisma.users.update({
                where: { id: userDto.id },
                data: userDto,
            });

            return UserEntity.fromObject(user);
        } catch (error) {
            throw CustomError.internalServer();
        }
    }
}
