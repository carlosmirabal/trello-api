import { prisma } from "../../data/postgres";
import { CustomError, UserEntity } from "../../domain";
import { CreateWorkSpaceDto } from "../../domain/dtos/workspace/create-workspace.dto";
import { UpdateWorkSpaceDto } from "../../domain/dtos/workspace/update-workspace.dto";
import { WorkSpaceEntity } from "../../domain/entities/workspace.entity";

/**
 * Servicio para gestionar los espacios de trabajo de un usuario
 */
export class WorkSpaceService {
    constructor() {}

    async getWorkSpaces(user: UserEntity) {
        const { id } = user;

        try {
            const workSpaces = await prisma.workspaces.findMany({
                where: { ownerId: id },
                omit: { ownerId: true },
            });

            return workSpaces.map((u) => WorkSpaceEntity.fromObject(u));
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async getWorkSpaceById(user: UserEntity, workSpaceId: string) {
        try {
            const workSpace = await prisma.workspaces.findUnique({
                where: { id: workSpaceId, ownerId: user.id },
                omit: { ownerId: true },
            });
            if (!workSpace) throw CustomError.notFound("WorkSpace not found");

            return WorkSpaceEntity.fromObject(workSpace);
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async createWorkSpace(workSpaceDto: CreateWorkSpaceDto) {
        const { name, ownerId } = workSpaceDto;

        const existWorkSpace = await prisma.workspaces.findFirst({
            where: {
                name,
                ownerId,
            },
            omit: { ownerId: true },
        });

        if (existWorkSpace) throw CustomError.badRequest(`WorkSpace with name ${name} already exists`);

        try {
            const newWorkSpace = await prisma.workspaces.create({ data: workSpaceDto });

            const workSpaceEntity = WorkSpaceEntity.fromObject(newWorkSpace);

            return workSpaceEntity;
        } catch (error) {
            throw CustomError.internalServer();
        }
    }

    async updateWorkSpace(workSpaceDto: UpdateWorkSpaceDto) {
        try {
            const workSpace = await prisma.workspaces.update({
                where: { id: workSpaceDto.id },
                data: workSpaceDto,
            });

            return WorkSpaceEntity.fromObject(workSpace);
        } catch (error) {
            throw CustomError.internalServer();
        }
    }
}
