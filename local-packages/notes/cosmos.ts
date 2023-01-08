import { Repository } from "../core/repository";
import CosmosRepository from "../core/cosmos";
import { Note } from "./model";

export class CosmosNoteRepository extends CosmosRepository<Note> {

    public async list(filter: [FilterParameter]): Promise<Enumerable<T>> {
        return base.query(`select * from ${this.container.name} where userId=@userId`
            , CosmosRepository.queryParameters(filter));
    }

    
}

