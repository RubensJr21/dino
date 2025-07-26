import { Standard } from "@src/core/entities/standard.entity";

// https://typescript.tv/errors/#ts1196
export class StandardNotFoundById extends Error {
  readonly name: string = "StandardNotFoundById";
  
  constructor(item_value_id: Standard["id"]){
    super(`Standard id: '${item_value_id}' not founded!`, {
      cause: `The item_value id '${item_value_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isStandardNotFoundById(error: unknown): error is StandardNotFoundById {
  return error instanceof StandardNotFoundById;
}

// END StandardNotFoundById Declaration

// https://typescript.tv/errors/#ts1196
export class StandardNotFoundOnDeleting extends Error {
  readonly name: string = "StandardNotFoundOnDeleting";
  
  constructor(item_value_id: Standard["id"]){
    super(`Standard id: '${item_value_id}' not founded!`, {
      cause: `The item_value id '${item_value_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isStandardNotFoundOnDeleting(error: unknown): error is StandardNotFoundOnDeleting {
  return error instanceof StandardNotFoundOnDeleting;
}

// END StandardNotFoundOnDeleting Declaration

export class StandardUnknownError extends Error {
  readonly name: string = "StandardUnknownError";
    constructor(){
    super(`Standard not founded!`, {
      cause: `Unknown`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isStandardUnknownError(error: unknown): error is StandardUnknownError {
  return error instanceof StandardUnknownError;
}
// END StandardUnknownError Declaration