import type { EntityNames, RepoDomainError, RepoResult } from "../types/Result_v2";


export function MakeDecoratorForMethodRepository<Repo>(entity: EntityNames){
  return () => WithPromiseTryEntity2<Repo>(entity)
}

function WithPromiseTryEntity2<Repo>(entity: EntityNames) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value!;
    descriptor.value = function (...args: unknown[]) {
      return Promise
        .try(() => original.apply(this, args))
        .then(res => res)
        .catch((error: Error) => {
          console.error(error);
          
          const domainError: RepoDomainError<Repo> = {
            code: "Z_INTERNAL_REPO_ERROR",
            method: target[propertyKey] as RepoDomainError<Repo>["method"],
            scope: entity,
            message: `Erro Interno (message = ${error.message}, cause = ${error.cause ?? "unknown"})`
          };

          return {
            success: false,
            error: domainError
          } as RepoResult<any, Repo>;
        });
    };
    return descriptor;
  };
}