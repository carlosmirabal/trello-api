export class UpdateUserDto {
    private constructor(
        public email?: string,
        public name?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public isActived?: boolean
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
        const { email, name, lastName, phoneNumber, isActived } = object;

        // ?: Validate body of request

        return [undefined, new UpdateUserDto(email, name, lastName, phoneNumber, isActived)];
    }
}
