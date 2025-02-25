import { v4 as uuidv4, validate } from "uuid";

export class Uuid {
    static v4 = () => uuidv4();
    static validate = (uuid: string) => validate(uuid);
}
