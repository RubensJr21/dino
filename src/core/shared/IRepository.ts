export default interface IRepository<T, PARTIAL_T, DTO, TYPE_ID> {
    create(data: DTO): Promise<T | undefined>;
    findById(id: TYPE_ID): Promise<T | undefined>;
    findAll(): Promise<T[]>;
    update(data: PARTIAL_T): Promise<T | undefined>;
    delete(id: TYPE_ID): Promise<boolean>;
}