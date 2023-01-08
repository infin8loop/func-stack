export type Entity = {
    /** The id of the item. Uniquely identifies the item along with the partition key */
    id: string;
    /** Time to live in seconds for collections with TTL enabled */
    ttl?: number;
    [key: string]: any;
}

export interface Repository<T> {
  create(item: T): Promise<T>;
  read(id: string): Promise<T | null>;
  update(item: T): Promise<T>;
  upsert(item: T): Promise<T>;
  list(filter: [FilterParameter]): Promise<<T>>; // e.g. this.list({ where { userId: { equals : '7' } } } );
  delete(id: string): Promise<any>;
}

export interface FilterParameter {
  [index: string]: Scalar;    
}

export interface Schema<T> {
  parse(data: unknown): T;
  safeParse(data: unknown): { success: true; data: T; } | { success: false; error: SchemaError; }
}

export interface SchemaError extends Error {

}

export interface SchemaOnReadError<T> extends SchemaError {
  /** Contains the data which is the source of the error. */
  data: T;
}

export class RespositoryBase<T> implements Repository<T> {
  constructor(schema: Schema = null) {
    this._schema = schema;
  }

  private _schema : Schema | null = null;
  public get schema(): Schema<T> { return this._schema; }
  public set schema(value: Schema<T>) { this._schema = value; }

  protected parse(data: T): T {
    return this.schema?.parse(data) || data;
  }

  protected safeParse(data: T): { success: true; data: T; } | { success: false; error: SchemaError; data: T } {
    return this.schema?.safeParse(data) || { success: true, data };
  }

  protected readWithSchema(item: T): Promise<T> {
    const data: T = await this.read(item);
    try {
      return this.parse(data);
    } catch(error) {
      error.data = data;
      throw error;
    }
  }

  create(item: T): Promise<T> {
    return parse(item);
  }

  read(id: string): Promise<T | null>;
  update(item: T): Promise<T> {
    return parse(item);
  }
  upsert(item: T): Promise<T> {
    return parse(item);
  }

  list(filter: [FilterParameter]): Promise<<T>>; // e.g. this.list({ where { userId: { equals : '7' } } } );
  delete(id: string): Promise<any>;
}

//--------------------------------

export interface Filter = {
  where: Where
}

interface Predicate {
  [index: string]: Operator;
}

export interface Where = {
  [index: string]?: Operator;
  AND?: Enumerable<Predicate>
  OR?: Enumerable<Predicate>
  NOT?: Enumerable<Predicate>
}

export type Scalar = string | number | Date;

export interface Operator = {
  equals?: Scalar
  lt?: Scalar
  lte?: Scalar
  gt?: Scalar
  gte?: Scalar
}

// repository.list([{ orgnaization: "Buy More" }])

// export type DateTimeFilter = {
//     equals?: Date | string
//     // in?: Enumerable<Date> | Enumerable<string>
//     // notIn?: Enumerable<Date> | Enumerable<string>
//     lt?: Date | string
//     lte?: Date | string
//     gt?: Date | string
//     gte?: Date | string
//     // not?: NestedDateTimeFilter | Date | string
//   }

//   export type StringFilter = {
//     equals?: string | null
//     // in?: Enumerable<string> | null
//     // notIn?: Enumerable<string> | null
//     lt?: string
//     lte?: string
//     gt?: string
//     gte?: string
//     contains?: string
//     startsWith?: string
//     endsWith?: string
//     // mode?: QueryMode
//     // not?: NestedStringNullableFilter | string | null
//   }