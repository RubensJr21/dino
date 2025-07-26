import { ItemValue } from "@src/core/entities/item_value.entity";

export class ItemValueNotFoundById extends Error {
  readonly name: string = "ItemValueNotFoundById";
  /**
   * @param {ItemValue["id"]} item_value_id item_value_id que gerou erro ao ser buscada
   */
  constructor(item_value_id: ItemValue["id"]){
    super(`ItemValue id: '${item_value_id}' not founded!`, {
      cause: `The item_value id '${item_value_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isItemValueNotFoundById(error: unknown): error is ItemValueNotFoundById {
  return error instanceof ItemValueNotFoundById;
}

// END ItemValueNotFoundById Declaration

export class ItemValueUnknownError extends Error {
  readonly name: string = "ItemValueUnknownError";
    constructor(){
    super(`ItemValue not founded!`, {
      cause: `Unknown`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isItemValueUnknownError(error: unknown): error is ItemValueUnknownError {
  return error instanceof ItemValueUnknownError;
}
// END ItemValueUnknownError Declaration