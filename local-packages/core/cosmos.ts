import { Repository } from "./repository";
import { CosmosClient, Container, CosmosClientOptions, Database, ItemDefinition, SqlParameter, ResourceResponse } from "@azure/cosmos";

export default abstract class CosmosRepository<T extends ItemDefinition> implements Repository<T> {
    private _client : CosmosClient | null = null;
    private _database : Database | null = null;
    private _container : Container | null = null;

    constructor(connection: string | CosmosClientOptions | CosmosClient, database: string, container : string) {
        if (!this._client) {
            if (typeof connection === "string") {
                this._client = new CosmosClient(connection as string);
            } else if (connection instanceof CosmosClient) {
                this._client = connection;
            } else if (connection.endpoint) {
                this._client = new CosmosClient(connection as CosmosClientOptions);
            } else {
                throw new Error("Invalid connection parameter.");
            }
        }
        if (!this._client) {
            throw new Error("Failed to connect to database.  Check connection constructor arguments.");
        }
        this._database = this._client.database(database);
        this._container = this._database.container(container);
    }

    private get container() : Container { 
        if (this._container) return this._container
        else throw new Error("CosmosRepository containter reference not set.");
    }

    public async create(item: T): Promise<T> {
        const { resource } = await this.container.items.create<T>(item);
        return resource as T;
    }

    public async read(id: string): Promise<T | null>  {
        const { resource }  = await this.container.item(id).read<T>();
        return resource as T;
    }

    public async delete(id: string): Promise<any> {
        const { statusCode } = await this.container.item(id).delete<T>();   // TODO: include partition key
        return statusCode;
    }

    protected async query(query: string, paramters: [SqlParameter]): Promise<Enumerable<T>> {
        const querySpec = { query, parameters };
        const { resources } = await container.items.query(querySpec).fetchAll();  
        return resources;    
    }
    
    protected static queryParameters(filter: [FilterParameter]) : [SqlParameter] {
        throw new Error("Not implemented");
        const result : [SqlParameter] = [];
        for (let param in filter) {
            for (let name of param) {
                result.push({ name: `@${name}`, value: param[name] });
            }
        }
        return result;
    }

    public abstract async list(filter: [FilterParameter]): Promise<Enumerable<T>>;
    /* e.g. {
            return base.query(`select * from ${this.container.name} where userId=@userId`
            , CosmosRepository.queryParameters(filter)); }
    */
}
