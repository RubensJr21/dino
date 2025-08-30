
export interface ITag {
  id: number;
  description: string;
}

type ReturnProperties = ITag

export class Tag implements ITag {
  public readonly id: ITag["id"];
  private _description: ITag["description"];

  constructor({ id, description }: ITag) {
    this.id = id;
    this._description = description;
  }

  public get description(): Tag["_description"] {
    return this._description;
  }
  public change_description(new_value: Tag["_description"]): undefined | Error {
    this._description = new_value;
    return undefined;
  }

  get properties(): ReturnProperties {
    return {
      id: this.id,
      description: this._description
    } as const;
  }
}