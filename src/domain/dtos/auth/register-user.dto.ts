// DATA TRANSFER OBJECTS -> DTO

import { regularExps } from "../../../config/regular-exp";

/**
 * Register User DTO
 * @description Validamos que los parametros que se envian a la API sean correctos
 */
export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
        public lastName?: string,
        public phoneNumber?: string
    ) {}

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password, lastName, phoneNumber } = object;

        if (!name) return ["Missing name"];
        if (!email) return ["Missing email"];
        if (!regularExps.email.test(email)) return ["Email is not valid"];
        if (!password) return ["Missing password"];
        if (password.length < 6) return ["Password too short"];

        return [undefined, new RegisterUserDto(name, email, password, lastName, phoneNumber)];
    }
}
