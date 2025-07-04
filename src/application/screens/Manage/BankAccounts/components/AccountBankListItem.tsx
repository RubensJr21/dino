import BankAccountApi from "@src/application/api/bank-account.api";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { isBankAccountNotFoundById } from "@src/core/shared/errors/bank_account";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ListItemProps as ItemProps, List, MD3Theme } from "react-native-paper";
import { MdiNamesIcon } from "../../../../components/ChooseIcon";
import { EditParams } from "../edit";

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
      transfer_methods.map(({method, transfer_method}) => [
        method,
        transfer_method.is_disabled,
      ])
    )
  );
}

interface AccountBankListItemProps {
  bank_account: BankAccount;
  theme: MD3Theme;
  navigateToEditPage: (params: EditParams) => void;
  navigateToReportsPage: () => void;
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
          const transfers_method_type = await BankAccountApi.list_all_transfers_methods_type.execute({id: bank_account.id})
          navigateToEditPage({
              id: bank_account.id,
              nickname: bank_account.nickname,
              transfer_methods: serializeTransferMethodsToEditPage(transfers_method_type)
            });
        }}
      />
      <ListItem
        title={`${bank_disable ? "H" : "Des"}abilitar conta bancária`}
        color={theme.colors.inverseSurface}
        icon={`bank${bank_disable ? "-" : "-off-"}outline`}
        onPress={async () => {
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
                Alert.alert(
                  "Erro ao habilitar conta bancária!",
                  "Ocorreu um erro ao tentar habilitar a conta bancária."
                );
              });
          }
        }}
      />
      <ListItem
        title="Abrir relatórios da conta bancária"
        color={theme.colors.tertiary}
        icon="finance"
        onPress={() => {
          // TODO: Implementar funcionalidade de navegar para a página de relatório de contas bancárias
          // navigateToReportsPage({
          //   id: `${bank_account.id}`,
          //   nickname: bank_account.nickname
          // });
        }}
      />
    </List.Accordion>
  );
}

interface ListItemProps extends ItemProps {
  title: string;
  color: string;
  icon: MdiNamesIcon;
}

function ListItem({ title, color, icon, onPress }: ListItemProps) {
  return (
    <List.Item
      title={title}
      left={(props) => (
        <List.Icon
          {...props}
          icon={icon}
          color={color}
        />
      )}
      titleStyle={{ color }}
      onPress={onPress}
    />
  );
}