import type { FilterParameter } from "core";
import { CosmosRepository } from "core";
import type { User, UserReader } from "./models/user";

export class CosmosUserRepository extends CosmosRepository<User> implements UserReader {
    readUserById(id: string): { id: string; email: string; } {
        throw new Error("Method not implemented.");
    }
    readUserByEmail(email: string): { id: string; email: string; } {
        throw new Error("Method not implemented.");
    }
    public list(filter: FilterParameter): Promise<{ id: string; email: string; }[]> {
        throw new Error("Method not implemented.");
    }
    
    public query(query: string, parameters: FilterParameter): Promise<Array<User>> {
        throw new Error("Method not implemented.");
    }
}