export interface EntityReader<T> {
  read(id: string): Promise<T | null>;
}

export interface EntityWriter<T> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  upsert(item: T): Promise<T>;
  delete(id: string): Promise<any>;
}
export interface EntityList<T> {
  list(filter: FilterParameter): Promise<Array<T>>; // e.g. list({ userId: 'user@example.com' } );
}

export interface EntityQuery<T> {
  query(query: string, parameters: FilterParameter): Promise<Array<T>>
}

export interface QuerySingle<T> {
  single(filter: [FilterParameter]): Promise<T>;
  singleOrUndefined(filter: [FilterParameter]): Promise<T | undefined>;
}

export interface Repository<T> extends EntityReader<T>, EntityWriter<T>, EntityQuery<T>, EntityList<T> {};

// export interface Repository<T> {
//   create(item: T): Promise<T>;
//   read(id: string): Promise<T | null>;
//   update(item: T): Promise<T>;
//   upsert(item: T): Promise<T>;
//   list(filter: [FilterParameter]): Promise<ReadonlyArray<T>>; // e.g. this.list({ where { userId: { equals : '7' } } } );
//   delete(id: string): Promise<any>;
// }

export type Scalar = string | number | Date;

export interface FilterParameter {
  [index: string]: Scalar;    
}

export interface Schema<T> {
  parse(data: unknown): T;
}

export interface SchemaError extends Error {
}

export interface SchemaOnReadError<T> extends SchemaError {
  /** Contains the data which is the source of the error. */
  data: T;
}

export abstract class RepositoryBase<T> implements EntityReader<T>, EntityWriter<T> {
  constructor(private schema: Schema<T> | null = null) {}

  query(query: string, parameters: [FilterParameter]): Promise<readonly T[]> {
    throw new Error("Method not implemented.");
  }

  protected parse(data: T): Promise<T> {
    const result = this.schema?.parse(data) || data;
    return new Promise((resolve) => resolve(result));
  }

  protected async readWithSchema(data: T): Promise<T | null> {
    // const data: T | null = await this.read(id);
    try {
      return data !== null ? await this.parse(data) : data;
    } catch(error) {
      (error as any).data = data;
      throw error;
    }
  }

  create(item: T): Promise<T> {
    return this.parse(item);
  }

  abstract read(id: string): Promise<T | null>;

  update(item: T): Promise<T> {
    return this.parse(item);
  }

  upsert(item: T): Promise<T> {
    return this.parse(item);
  }

  abstract delete(id: string): Promise<any>;

  // abstract list(filter: [FilterParameter]): Promise<ReadonlyArray<T>>; // e.g. this.list({ where { userId: { equals : '7' } } } );
}

/* IDEAS:

export interface Filter {
  where: Where
}

interface Predicate {
  [index: string]: Operator;
}

export interface Where {
  AND?: ReadonlyArray<Predicate>;
  OR?: ReadonlyArray<Predicate>
  NOT?: ReadonlyArray<Predicate>
}

export interface Operator {
  equals?: Scalar
  lt?: Scalar
  lte?: Scalar
  gt?: Scalar
  gte?: Scalar
}
*/