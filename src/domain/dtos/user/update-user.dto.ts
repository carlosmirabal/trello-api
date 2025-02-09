export class UpdateUserDto {
    private constructor(
        public id: number,
        public email?: string,
        public name?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public isActived?: boolean
    ) {}

    static create(object: { [key: string]: any }, userIdToken: number): [string?, UpdateUserDto?] {
        const { id, email, name, lastName, phoneNumber, isActived } = object;

        if (id !== userIdToken) return ["You can only update your own user"];

        return [undefined, new UpdateUserDto(id, email, name, lastName, phoneNumber, isActived)];
    }
}
