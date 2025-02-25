// DATA TRANSFER OBJECTS -> DTO

/**
 * Register User DTO
 * @description Validamos que los parametros que se envian a la API sean correctos
 */
export class CreateWorkSpaceDto {
    private constructor(public name: string, public description: string, public ownerId: number) {}

    static create(object: { [key: string]: any }): [string?, CreateWorkSpaceDto?] {
        const { name, description, ownerId } = object;

        if (!name) return ["Missing name"];

        return [undefined, new CreateWorkSpaceDto(name, description, ownerId)];
    }
}
