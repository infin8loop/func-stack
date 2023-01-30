"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosRepository = void 0;
const cosmos_1 = require("@azure/cosmos");
class CosmosRepository {
    constructor(connection, databaseName, containerName) {
        this.databaseName = databaseName;
        this.containerName = containerName;
        this._client = null;
        this._database = null;
        this._container = null;
        if (!this._client) {
            if (typeof connection === "string") {
                this._client = new cosmos_1.CosmosClient(connection);
            }
            else if (connection instanceof cosmos_1.CosmosClient) {
                this._client = connection;
            }
            else if (connection.endpoint) {
                this._client = new cosmos_1.CosmosClient(connection);
            }
            else {
                throw new Error("Invalid connection parameter.");
            }
        }
        if (!this._client) {
            throw new Error("Failed to connect to database.  Check connection constructor arguments.");
        }
        this._database = this._client.database(databaseName);
        this._container = this._database.container(containerName);
    }
    update(item) {
        throw new Error("Method not implemented.");
    }
    upsert(item) {
        throw new Error("Method not implemented.");
    }
    get container() {
        if (this._container)
            return this._container;
        else
            throw new Error("CosmosRepository containter reference not set.");
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource } = yield this.container.items.create(item);
            return resource;
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource } = yield this.container.item(id).read();
            return resource;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { statusCode } = yield this.container.item(id).delete(); // TODO: include partition key
            return statusCode;
        });
    }
    query(query, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySpec = { query, parameters: CosmosRepository.queryParameters(parameters) };
            const { resources } = yield this.container.items.query(querySpec).fetchAll();
            return resources;
        });
    }
    static queryParameters(filter) {
        throw new Error("Not implemented");
        // const result : [SqlParameter] = [];
        // for (let param in filter) {
        //     for (let name of param) {
        //         result.push({ name: `@${name}`, value: param[name] });
        //     }
        // }
        // return result;
    }
}
exports.CosmosRepository = CosmosRepository;
//# sourceMappingURL=cosmos.js.map