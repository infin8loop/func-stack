import cuid from "cuid";
import { z } from "zod";

export type Entity = {
    /** The id of the item. Uniquely identifies the item along with the partition key */
    id: string;
    /** Time to live in seconds for collections with TTL enabled */
    ttl?: number;
    [key: string]: any;
}

export const entityId = cuid;   // or uuid (or nanoId)
export const zodEntityIdType = () => z.string().cuid();  // or uuid() (no built-in nanoId validation)

const EntitySchema = z.object({
    id: zodEntityIdType(),
    ttl: z.number(),
}).required({ id: true });
