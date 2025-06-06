import BankAccountApi from "@src/application/api/bank-account.api";
import { AccountsBankEditParams } from "@src/application/app/manage/banks-account/edit";
import { AccountsBankReportsParams } from "@src/application/app/manage/banks-account/reports";
import { FunctionNavigateTo } from "@src/application/lib/router-functions";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { isBankAccountNotFoundById } from "@src/core/shared/errors/bank_account";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { List, MD3Theme } from "react-native-paper";
import { MdiNamesIcon } from "../ChooseIcon";
import { ListItem } from "../shared/ListItem";

async function disableAccountBank(id: number){
  try {
    return await BankAccountApi.disable.execute({id})
  } catch (error) {
    if(isBankAccountNotFoundById(error)) {
      Alert.alert("Conta bancária não encontrada.")
    }
    Alert.alert("Erro ao desabilitar conta bancária.");
    throw error;
  }
}
async function enableAccountBank(id: number){
  try {
    return await BankAccountApi.enable.execute({id})
  } catch (error) {
    if(isBankAccountNotFoundById(error)) {
      Alert.alert("Conta bancária não encontrada.")
    }
    Alert.alert("Erro ao habilitar conta bancária.");
    throw error;
  }
}

function serializeTransferMethodsToEditPage(
  transfer_methods: BankAccountTransferMethod[]
): string {
  return JSON.stringify(
    Object.fromEntries(
      transfer_methods.map(({type, is_enable}) => [
        type,
        is_enable,
      ])
    )
  );
}

interface AccountBankListItemProps {
  bank_account: BankAccount;
  theme: MD3Theme;
  navigateToEditPage: FunctionNavigateTo<AccountsBankEditParams>;
  navigateToReportsPage: FunctionNavigateTo<AccountsBankReportsParams>;
}

export function AccountBankListItem({
  bank_account,
  theme,
  navigateToEditPage,
  navigateToReportsPage
}: AccountBankListItemProps) {
  const [expanded, setExpanded] = useState(false);

  const [bank_disable, setBank_disable] = useState(bank_account.is_disabled);

  useEffect(() => {

  }, [bank_disable]);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <List.Accordion
      title={bank_account.nickname}
      titleNumberOfLines={3}
      left={(props) => (
        <List.Icon
          {...props}
          icon={"bank-outline" as MdiNamesIcon}
        />
      )}
      expanded={expanded}
      onPress={handlePress}
      onLongPress={handlePress}
    >
      <ListItem
        title="Editar conta bancária"
        color={theme.colors.onPrimaryContainer}
        icon="pencil"
        onPress={async () => {
          // console.log(`Editando conta bancária ${bank_account.id}`);
          const transfers_method_type = await BankAccountApi.list_all_transfers_methods_type.execute({id: bank_account.id})
          console.log("Transfer methods type:", serializeTransferMethodsToEditPage(transfers_method_type));
          navigateToEditPage({
            id: `${bank_account.id}`,
            nickname: bank_account.nickname,
            balance: `${bank_account.balance}`,
            transfer_methods: serializeTransferMethodsToEditPage(transfers_method_type)
          });
        }}
      />
      <ListItem
        title={`${bank_disable ? "H" : "Des"}abilitar conta bancária`}
        color={theme.colors.inverseSurface}
        // credit-card-off, credit-card-off-outline
        // account-off, account-off-outline
        // bank-off, bank-off-outline
        icon={`bank${bank_disable ? "-" : "-off-"}outline`}
        onPress={async () => {
          console.log(`Desabilitando conta bancária ${bank_account.id}`)
          if(!bank_disable){
            disableAccountBank(bank_account.id)
              .then((bank_account) => {
                setBank_disable(bank_account.is_disabled);
              })
              .catch((error) => {
                console.error("Erro ao desabilitar conta bancária:", error);
                Alert.alert(
                  "Erro ao desabilitar conta bancária.",
                  "Ocorreu um erro ao tentar desabilitar a conta bancária."
                );
              });
          } else {
            enableAccountBank(bank_account.id)
              .then((bank_account) => {
                setBank_disable(bank_account.is_disabled);
              })
              .catch((error) => {
                console.error("Erro ao habilitar conta bancária:", error);
                Alert.alert(
                  "Erro ao habilitar conta bancária.",
                  "Ocorreu um erro ao tentar habilitar a conta bancária."
                );
              });
          }
        }}
      />
      <ListItem
        title="Abrir relatórios da conta bancária"
        color={theme.colors.tertiary}
        // finance ou chart-box
        icon="finance"
        onPress={() => {
          console.log(
            `Abrindo relatórios da conta bancária ${bank_account.id}`
          );
          navigateToReportsPage({
            id: `${bank_account.id}`,
            nickname: bank_account.nickname
          });
        }}
      />
    </List.Accordion>
  );
}