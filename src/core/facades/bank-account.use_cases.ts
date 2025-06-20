import { IRepoBankAccount } from "@src/infrastructure/repositories/bank_account.repository";
import { IRepoBankAccountTransferMethod } from "@src/infrastructure/repositories/bank_account_transfer_method.repository";
import DisableBankAccount from "../use_cases/bank-account/disable.use_case";
import EnableBankAccount from "../use_cases/bank-account/enable.use_case";
import ListAllBankAccounts from "../use_cases/bank-account/list_all.use_case";
import ListAllTransfersMethodTypeBankAccount from "../use_cases/bank-account/list_all_transfers_method_type.use_case";
import RegisterBankAccount from "../use_cases/bank-account/register.use_case";
import UpdateBalanceBankAccount from "../use_cases/bank-account/update_balance.use_case";
import UpdateNicknameBankAccount from "../use_cases/bank-account/update_nickname.use_case";
import UpdateTransferMethodsBankAccount from "../use_cases/bank-account/update_transfer_methods.use_case";

/*
  Aqui está sendo utilizado o design pattern FACADE
  
  links úteis:
  https://refactoring.guru/pt-br/design-patterns/facade
  https://refactoring.guru/pt-br/design-patterns/facade/typescript/example
*/ 

export default class BankAccountUseCases {
  public readonly register: RegisterBankAccount;
  public readonly disable: DisableBankAccount;
  public readonly enable:  EnableBankAccount;
  public readonly list_all: ListAllBankAccounts;
  public readonly list_all_transfers_methods_type: ListAllTransfersMethodTypeBankAccount;
  public readonly update_balance: UpdateBalanceBankAccount;
  public readonly update_nickname: UpdateNicknameBankAccount;
  public readonly update_transfer_methods: UpdateTransferMethodsBankAccount;
  
  /**
   * Initializes use cases for bank account operations
   * @param {IRepoBankAccount} repo Primary repository for bank account operations
   * @param {IRepoBankAccountTransferMethod} repo_ba_tm Repository for bank account transfer methods
   * @description Constructs instances of various bank account use cases with required repositories
   */
  constructor(repo: IRepoBankAccount, repo_ba_tm: IRepoBankAccountTransferMethod) {
    this.register = new RegisterBankAccount(repo, repo_ba_tm);
    this.disable = new DisableBankAccount(repo);
    this.enable = new EnableBankAccount(repo);
    this.list_all = new ListAllBankAccounts(repo);
    this.list_all_transfers_methods_type = new ListAllTransfersMethodTypeBankAccount(repo_ba_tm);
    this.update_balance = new UpdateBalanceBankAccount(repo);
    this.update_nickname = new UpdateNicknameBankAccount(repo);
    this.update_transfer_methods = new UpdateTransferMethodsBankAccount(repo, repo_ba_tm);
  }
}