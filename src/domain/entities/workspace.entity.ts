import { CustomError } from "../errors/custom.error";

/** 
    Será la entidad con la que trabajemos en la aplicación
    Así evitamos usar directamente la entidad de Postgres
*/
export class WorkSpaceEntity {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public ownerId: string,
        public isActived: Object[],
        public boards?: Object[],
        public users?: Object[]
    ) {}

    /**
     *
     * @returns {Object} - Retorna un objeto con los datos de la entidad
     */
    static fromObject(object: { [key: string]: any }) {
        const { id, name, description, ownerId, isActived, boards, users } = object;

        return new WorkSpaceEntity(id, name, description, ownerId, isActived, boards, users);
    }
}
