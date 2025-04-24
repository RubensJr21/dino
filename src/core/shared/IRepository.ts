export default interface IRepository<T extends {id: number}> {
  create(data: StrictOmit<T, "id">): Promise<T | undefined>;
  findById(id: T["id"]): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  update(id: T["id"], data: StrictOmit<T, "id">): Promise<T | undefined>;
  delete(id: T["id"]): Promise<boolean>;
}