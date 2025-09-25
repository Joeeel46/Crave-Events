export interface IBaseRepository<T> {
  find(filter?: Record<string, unknown>): Promise<T[]>;
  findAll(
    filter?: Record<string, unknown>,
    skip?: number,
    limit?: number,
    sort?: Record<string, 1 | -1>
  ): Promise<{ items: T[]; total: number }>;
  findOne(filter: Record<string, unknown>): Promise<T | null>;
  save(data: Partial<T>): Promise<T>;
  update(filter: Record<string, unknown>, updateData: Partial<T>): Promise<T | null>;
  delete(filter: Record<string, unknown>): Promise<T | null>
}