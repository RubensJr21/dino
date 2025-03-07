import IEntityBase from "../model/IEntityBase";

export type RepositoryRegisterParam<T extends IEntityBase> = StrictOmit<
	T,
	"id"
>;

export default interface IRepository<ENTITY extends IEntityBase> {
	register(
		entity: RepositoryRegisterParam<ENTITY>
	): Promise<ENTITY | undefined>;
	findById(id: ENTITY["id"]): Promise<ENTITY | undefined>;
	findAll(): Promise<ENTITY[]>;
	update(entity: ENTITY): Promise<ENTITY | undefined>;
	delete(id: ENTITY["id"]): Promise<boolean>;
}
