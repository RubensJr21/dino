import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";

// https://typescript.tv/errors/#ts1196
export class RecurrenceTypeNotFoundById extends Error {
  readonly name: string = "RecurrenceTypeNotFoundById";
  constructor(recurrence_type_id: RecurrenceType["id"]){
    super(`RecurrenceType id: '${recurrence_type_id}' not founded!`, {
      cause: `The recurrence_type id '${recurrence_type_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeNotFoundById(error: unknown): error is RecurrenceTypeNotFoundById {
  return error instanceof RecurrenceTypeNotFoundById;
}

export class RecurrenceTypeNotFoundByType extends Error {
  readonly name: string = "RecurrenceTypeNotFoundByType";
  constructor(bank_account_type: RecurrenceType["type"]){
    super(`RecurrenceType type: '${bank_account_type}' not founded!`, {
      cause: `The type bank_account '${bank_account_type}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeNotFoundByType(error: unknown): error is RecurrenceTypeNotFoundByType {
  return error instanceof RecurrenceTypeNotFoundByType;
}

// END RecurrenceTypeNotFoundByType Declaration

export class RecurrenceTypeTypeIsAlreadyInUse extends Error {
  readonly name: string = "RecurrenceTypeTypeIsAlreadyInUse";
 constructor(bank_account_type: RecurrenceType["type"]){
   super(`The RecurrenceType type: '${bank_account_type}' already in use!`)
  }
}

// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeTypeIsAlreadyInUse(error: unknown): error is RecurrenceTypeTypeIsAlreadyInUse {
  return error instanceof RecurrenceTypeTypeIsAlreadyInUse;
}

// END RecurrenceTypeTypeIsAlreadyInUse Declaration

export class RecurrenceTypeUnknownError extends Error {
  readonly name: string = "RecurrenceTypeUnknownError";
    constructor(){
    super(`RecurrenceType not founded!`, {
      cause: `Unknown`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isRecurrenceTypeUnknownError(error: unknown): error is RecurrenceTypeUnknownError {
  return error instanceof RecurrenceTypeUnknownError;
}
// END RecurrenceTypeUnknownError Declaration