
export interface ITransferMethod {
  id: number;
  method: string;
}

type ReturnProperties = ITransferMethod

export class TransferMethod implements ITransferMethod {
  private readonly _id: ITransferMethod["id"]
  private _method: ITransferMethod["method"]
  
  constructor({
    id,
    method
  }: ITransferMethod){
    this._id = id;
    this._method = method;
  }
  
  get id(): TransferMethod["_id"]{
    return this._id
  }

  get method(): TransferMethod["_method"]{
    return this._method
  }
    
  get properties(): ReturnProperties {
    return {
      id: this.id,
      method: this.method
    } as const
  }
}