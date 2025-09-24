
export interface ITransferMethod {
  id: number;
  method: string;
  bank: {
    id: number;
    nickname: string;
  }
}

type ReturnProperties = ITransferMethod

export class TransferMethod implements ITransferMethod {
  private transfer_method: ITransferMethod

  constructor(transfer_method: ITransferMethod) {
    this.transfer_method = transfer_method;
  }

  get id(): ITransferMethod["id"] {
    return this.transfer_method.id
  }

  get method(): ITransferMethod["method"] {
    return this.transfer_method.method
  }

  get bank(): ITransferMethod["bank"] {
    return this.bank
  }

  get properties(): ReturnProperties {
    return {
      id: this.transfer_method.id,
      method: this.transfer_method.method,
      bank: this.transfer_method.bank
    } as const
  }
}