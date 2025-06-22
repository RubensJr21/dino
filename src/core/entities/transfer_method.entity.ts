import { IEntityWithDates } from "../shared/interfaces/IEntityWithDates";

/* eslint-disable jsdoc/require-jsdoc */
export interface ITransferMethod extends IEntityWithDates {
  nickname: string;
  is_disabled: boolean;
}

type ReturnProperties = ITransferMethod

export class TransferMethod implements ITransferMethod{
  private readonly _id: ITransferMethod["id"]
  private _nickname: ITransferMethod["nickname"]
  private _is_disabled: ITransferMethod["is_disabled"]
  private readonly _created_at: ITransferMethod["created_at"];
  private readonly _updated_at: ITransferMethod["updated_at"];
  
  constructor({
    id,
    nickname,
    is_disabled,
    created_at,
    updated_at
  }: ITransferMethod){
    this._id = id;
    this._nickname = nickname;
    this._is_disabled = is_disabled;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }
  
  get id(): TransferMethod["_id"]{
    return this._id
  }

  get nickname(): TransferMethod["_nickname"]{
    return this._nickname
  }
  public change_nickname(new_value: TransferMethod["_nickname"]) {
    this._nickname = new_value
  }

  get is_disabled(): TransferMethod["_is_disabled"]{
    return this._is_disabled
  }
  public enable() {
    this._is_disabled = true
  }
  public disable() {
    this._is_disabled = false
  }

  public get created_at(): TransferMethod["_created_at"]{
    return this._created_at;
  }

  public get updated_at(): TransferMethod["_updated_at"]{
    return this._updated_at;
  }
    
  get properties(): ReturnProperties {
    return {
      id: this.id,
      nickname: this.nickname,
      is_disabled: this.is_disabled,
      created_at: this._created_at,
      updated_at: this._updated_at,
    } as const
  }
}