import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { UserService } from "../services/user.service";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

export class UserController {
    constructor(public readonly userService: UserService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    };

    //TODO: Implement QueryParams to filter users (email, name, actived)
    getUsers = (req: Request, res: Response) => {
        this.userService
            .getUsers()
            .then((users) => res.json(users))
            .catch((error) => this.handleError(error, res));
    };

    getUserById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id: ${id}` });
            return;
        }

        this.userService
            .getUserById(id)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    };

    updateUser = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id: ${id}` });
            return;
        }
        console.log(req.body);

        // const [error, userDto] = UpdateUserDto.create(req.body);

        // if (error) {
        //     res.status(400).json({ error });
        //     return;
        // }

        // this.userService
        //     .updateUser(userDto!)
        //     .then((user) => res.json(user))
        //     .catch((error) => this.handleError(error, res));

        res.json({ message: `Updating user with id: ${id}` });
    };
}
