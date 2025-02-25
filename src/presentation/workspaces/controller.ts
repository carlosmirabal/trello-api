import { Request, Response } from "express";
import { CustomError, UserEntity } from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { WorkSpaceService } from "../services/workspace.service";
import { CreateWorkSpaceDto } from "../../domain/dtos/workspace/create-workspace.dto";
import { Uuid } from "../../config/uuid.adapter";
import { UpdateWorkSpaceDto } from "../../domain/dtos/workspace/update-workspace.dto";

export class WorkSpaceController {
    constructor(public readonly workSpaceService: WorkSpaceService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    };

    getWorkSpaces = (req: Request, res: Response) => {
        const user = req.body.user as UserEntity;

        this.workSpaceService
            .getWorkSpaces(user)
            .then((workSpace) => res.json(workSpace))
            .catch((error) => this.handleError(error, res));
    };

    getWorkSpacesById = (req: Request, res: Response) => {
        const user = req.body.user as UserEntity;
        const workSpaceId = req.params.id;

        if (!Uuid.validate(workSpaceId)) {
            res.status(400).json({ error: `Invalid id: ${workSpaceId}` });
            return;
        }

        this.workSpaceService
            .getWorkSpaceById(user, workSpaceId)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    };

    createWorkSpace = (req: Request, res: Response) => {
        const [error, workSpaceDto] = CreateWorkSpaceDto.create({ ...req.body.payload, ownerId: req.body.user.id });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.workSpaceService
            .createWorkSpace(workSpaceDto!)
            .then((workSpace) => res.json(workSpace))
            .catch((error) => this.handleError(error, res));
    };

    // Solo puede editar su propio usuario
    updateWorkSpace = (req: Request, res: Response) => {
        const id = req.params.id;
        if (!Uuid.validate(id)) {
            res.status(400).json({ error: `Invalid id: ${id}` });
            return;
        }

        const userId = req.body.user.id;
        const [error, workSpaceDto] = UpdateWorkSpaceDto.create(
            { ...req.body.payload, ownerId: req.body.user.id, id },
            userId
        );

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.workSpaceService
            .updateWorkSpace(workSpaceDto!)
            .then((workSpace) => res.json(workSpace))
            .catch((error) => this.handleError(error, res));
    };
}
