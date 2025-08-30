import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames"
import { RepoDomainError } from "@core-types/Result_v2"

export function build_internal_repo_error_generic<Repo>(
  scope: RepoInterfaceNames,
  method_name: Extract<keyof Repo, string>,
  error: Error
): RepoDomainError<Repo> {
  console.info({
    scope,
    method: method_name,
    code: "Z_INTERNAL_REPO_ERROR",
    message: `O Erro Crítico (message = ${error.message}, cause = ${error.cause})`
  })
  return {
    scope,
    method: method_name,
    code: "Z_INTERNAL_REPO_ERROR",
    message: `O Erro Crítico (message = ${error.message}, cause = ${error.cause})`
  }
}