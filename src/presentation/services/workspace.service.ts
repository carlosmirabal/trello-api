import { prisma } from "../../data/postgres";
import { CustomError, UserEntity } from "../../domain";
import { WorkSpaceEntity } from "../../domain/entities/workspace.entity";

export class WorkSpaceService {
    constructor() {}

    async getWorkSpaces(user: UserEntity) {
        const { id } = user;

        try {
            const workSpaces = await prisma.workspaces.findMany({
                where: { ownerId: id },
            });

            return workSpaces.map((u) => WorkSpaceEntity.fromObject(u));
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async getWorkSpaceById(user: UserEntity, workSpaceId: string) {
        try {
            const workSpace = await prisma.workspaces.findUnique({
                where: { id: workSpaceId },
            });

            if (!workSpace) {
                throw CustomError.notFound("WorkSpace not found");
            }

            return WorkSpaceEntity.fromObject(workSpace);
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer();
        }
    }
}
