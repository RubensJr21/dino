import EntityBase from "../model/EntityBase";

export type RegisterRepositoryDTO<T extends EntityBase> = StrictOmit<T, "id">;

export default interface IRepository<ENTITY extends EntityBase> {
	register(entity: RegisterRepositoryDTO<ENTITY>): Promise<ENTITY>;
	find(id: ENTITY["id"]): Promise<ENTITY | undefined>;
	findAll(): Promise<ENTITY[]>;
	update(entity: ENTITY): Promise<ENTITY>;
	delete(entity: ENTITY): Promise<boolean>;
}
