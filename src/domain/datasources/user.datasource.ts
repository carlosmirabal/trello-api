import { UserEntity } from "../entities/user.entity";

export abstract class UserDataSource {
    abstract getUsers(): Promise<UserEntity[]>;
    abstract findById(id: number): Promise<UserEntity>;
    abstract create(): Promise<UserEntity>;
    abstract update(): Promise<UserEntity>;
}
