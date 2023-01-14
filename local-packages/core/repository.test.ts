import { describe, it, test, expect } from "vitest";
import { FilterParameter, RepositoryBase, Schema } from "./repository";

describe("RepositoryBase", () => {
    class RepoTest extends RepositoryBase<Object> {
        constructor(private readValue: Object, schema?: Schema<Object>) {
            super(schema);
        }

        read(id: string): Promise<Object | null> {
            return new Promise((resolve) => {
                resolve(this.readWithSchema(this.readValue));
            })
        }
        list(filter: [FilterParameter]): Promise<readonly Object[]> {
            throw new Error("Method not implemented.");
        }
        delete(id: string): Promise<any> {
            throw new Error("Method not implemented.");
        }
    }

    test("works without schema", async () => {
        const expected = {};
        const repo = new RepoTest(expected);
        const unexpected = {};
        expect(expected).not.toBe(unexpected);

        const testEach = (value: Object | null) => {
            expect(value).toEqual(expected);
            expect(value).toBe(expected);
        };
        testEach(await repo.create(expected));
        testEach(await repo.update(expected));
        testEach(await repo.upsert(expected));
        testEach(await repo.read('an_id'));
    });

    type Entity = { id: string };
    const ID_REQUIRED_ERROR = "Entity.id value is required.";
    class SchemaTest implements Schema<Entity> {
        public parse(data: Entity): Entity {
            if (data && data.id) return data
            else throw new Error(ID_REQUIRED_ERROR);
        }
    }

    test("works with schema", async () => {
        const schema = new SchemaTest();
        const expected = { id: "one"};
        const repo = new RepoTest(expected, schema);
        const unexpected = { id: "one" };
        const invalid = { identity: "ONE" };
        expect(expected).not.toBe(unexpected);

        const testEach = (value: Object | null) => {
            expect(value).toEqual(expected);
            expect(value).toBe(expected);
        };
        testEach(await repo.create(expected));
        testEach(await repo.update(expected));
        testEach(await repo.upsert(expected));
        testEach(await repo.read("One"));

        expect(() => repo.create(invalid)).toThrow(ID_REQUIRED_ERROR);
        expect(() => repo.update(invalid)).toThrow(ID_REQUIRED_ERROR);
        expect(() => repo.upsert(invalid)).toThrow(ID_REQUIRED_ERROR);
    });
})