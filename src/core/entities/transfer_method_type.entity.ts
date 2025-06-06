/* eslint-disable jsdoc/require-jsdoc */
export interface ITransferMethodType {
  readonly id: number;
  name: string;
}

type ReturnProperties = ITransferMethodType

export class TransferMethodType implements ITransferMethodType{
  private readonly _id: ITransferMethodType["id"]
  private _name: ITransferMethodType["name"]
  
  constructor({id,name}: ITransferMethodType){
    this._id = id;
    this._name = name;
  }
  
  get id(): TransferMethodType["_id"]{
    return this._id
  }

  get name(): TransferMethodType["_name"]{
    return this._name
  }
  public change_name(new_value: TransferMethodType["_name"]): undefined | Error {
    this._name = new_value
    return undefined;
  }
    
  get properties(): ReturnProperties {
    return {
      id: this.id,
      name: this.name
    } as const
  }
}