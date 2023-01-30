import type { EntityReader, EntityWriter, FilterParameter} from "../core/repository";
import { CosmosRepository } from "core";
import type { Note} from "./models/note";

export class CosmosNoteRepository 
    extends CosmosRepository<Note> 
    implements EntityReader<Note>, EntityWriter<Note> {

    public async list(filter: FilterParameter): Promise<Array<Note>> {
        return super.query(`select * from ${super.containerName} where userId=@userId`
            , filter);
    }
}

