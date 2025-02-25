// DATA TRANSFER OBJECTS -> DTO

/**
 * Register User DTO
 * @description Validamos que los parametros que se envian a la API sean correctos
 */
export class UpdateWorkSpaceDto {
    private constructor(public id: string, public name: string, public description: string, public ownerId: number) {}

    static create(object: { [key: string]: any }, userIdToken: number): [string?, UpdateWorkSpaceDto?] {
        const { id, name, description, ownerId } = object;

        if (!id) return ["Missing id"];
        if (id !== userIdToken) return ["You can only update your own workspace"];

        return [undefined, new UpdateWorkSpaceDto(id, name, description, ownerId)];
    }
}
