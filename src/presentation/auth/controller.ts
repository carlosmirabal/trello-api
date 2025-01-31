import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";

export class AuthController {
    //DI
    constructor(public readonly authService: AuthService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    };

    registerUser = (req: Request, res: Response) => {
        // Validate the request body
        const [error, registerDto] = RegisterUserDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        // Create the user
        this.authService
            .registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    };

    loginUser = (req: Request, res: Response) => {
        // Validate the request body -> DTO
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        // Login the user -> Service
        this.authService
            .loginUser(loginUserDto!)
            .then((user) => res.json(user)) // Return the user and the token
            .catch((error) => this.handleError(error, res));
    };

    validateEmail = (req: Request, res: Response) => {
        const token = req.params.token;
    };
}
