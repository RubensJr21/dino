export type FnTransaction<T, U> = (tx: T) => U

export interface IUnitOfWork<T> {
  transaction<U>(fn: FnTransaction<T, U>): Promise<U>;
  // start(): Promise<void>;
  // complete(): Promise<void>;
  // rollback(): Promise<void>;
  // getOrderRepository(): IOrderRepository;
  // getOrderItemRepository(): IOrderItemRepository;
}