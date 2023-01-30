import type { FilterParameter, Repository } from "./repository";
import type { Container, CosmosClientOptions, Database, ItemDefinition, SqlParameter} from "@azure/cosmos";
import { CosmosClient } from "@azure/cosmos";

export abstract class CosmosRepository<T extends ItemDefinition> implements Repository<T> {
    protected _client : CosmosClient | null = null;
    protected _database : Database | null = null;
    protected _container : Container | null = null;

    constructor(connection: string | CosmosClientOptions | CosmosClient, 
        protected databaseName: string, protected containerName : string) {

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
        this._database = this._client.database(databaseName);
        this._container = this._database.container(containerName);
    }
    update(item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    upsert(item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }

    protected get container() : Container { 
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

    public async query(query: string, parameters: FilterParameter): Promise<Array<T>> {
        const querySpec = { query, parameters: CosmosRepository.queryParameters(parameters) };
        const { resources } = await this.container.items.query(querySpec).fetchAll();  
        return resources;    
    }
    
    protected static queryParameters(filter: FilterParameter) : SqlParameter[] {
        throw new Error("Not implemented");
        // const result : [SqlParameter] = [];
        // for (let param in filter) {
        //     for (let name of param) {
        //         result.push({ name: `@${name}`, value: param[name] });
        //     }
        // }
        // return result;
    }

    public abstract list(filter: FilterParameter): Promise<Array<T>>;
    /* e.g. {
            return base.query(`select * from ${this.container.name} where userId=@userId`
            , CosmosRepository.queryParameters(filter)); }
    */
}