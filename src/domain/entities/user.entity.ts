import { CustomError } from "../errors/custom.error";

/** 
    Será la entidad con la que trabajemos en la aplicación
    Así evitamos usar directamente la entidad de Postgres
*/
export class UserEntity {
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public lastName?: string,
        public phoneNumber?: string,
        public isVerified?: boolean,
        public isActived?: boolean,
        public createdAt?: Date,
        public collaborators?: Object[],
        public workSpaces?: Object[]
    ) {}

    /**
     *
     * @returns {Object} - Retorna un objeto con los datos de la entidad
     */
    static fromObject(object: { [key: string]: any }) {
        const { id, email, name, lastName, phoneNumber, isVerified, isActived, createdAt, collaborators, workSpaces } =
            object;

        if (!id) throw CustomError.badRequest("Missing ID");
        if (!email) throw CustomError.badRequest("Missing email");
        // if (!password) throw CustomError.badRequest("Missing password");
        if (!name) throw CustomError.badRequest("Missing name");

        return new UserEntity(
            id,
            email,
            name,
            lastName,
            phoneNumber,
            isVerified,
            isActived,
            createdAt,
            collaborators,
            workSpaces
        );
    }
}
