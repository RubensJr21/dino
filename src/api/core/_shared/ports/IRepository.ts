import IEntityBase from "@api/core/_shared/model/IEntityBase";

export type RepositoryRegisterParam<
	T extends IEntityBase,
	K extends keyof T
> = StrictOmit<T, K>;

export default interface IRepository<ENTITY extends IEntityBase, RegisterType> {
	register(entityForRegister: RegisterType): Promise<ENTITY | undefined>;
	findById(id: ENTITY["id"]): Promise<ENTITY | undefined>;
	findAll(): Promise<ENTITY[]>;
	update(entity: ENTITY): Promise<ENTITY | undefined>;
	delete(id: ENTITY["id"]): Promise<boolean>;
}
