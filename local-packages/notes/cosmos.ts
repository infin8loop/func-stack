import { FilterParameter, Repository } from "../core/repository";
import CosmosRepository from "../core/cosmos";
import { Note, NoteRepository } from "./model";

export class CosmosNoteRepository 
    implements EntityReader<Note>, EntityWriter<Note> 
    extends CosmosRepository<Note> {

    public async list(filter: [FilterParameter]): Promise<ReadonlyArray<Note>> {
        return super.query(`select * from ${this.containerName} where userId=@userId`
            , CosmosRepository.queryParameters(filter));
    }
}

