import { Request, Response } from "express";
import { CustomError, UserEntity } from "../../domain";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { WorkSpaceService } from "../services/workspace.service";

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

        if (workSpaceId.length !== 32) {
            res.status(400).json({ error: `Invalid id: ${workSpaceId}` });
            return;
        }

        this.workSpaceService
            .getWorkSpaceById(user, workSpaceId)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    };

    // Solo puede editar su propio usuario
    updateUser = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id: ${id}` });
            return;
        }

        const [error, userDto] = UpdateUserDto.create({ ...req.body.payload, id }, req.body.user.id);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        // this.userService
        //     .updateUser(userDto!)
        //     .then((user) => res.json(user))
        //     .catch((error) => this.handleError(error, res));
    };
}
