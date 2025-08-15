import BankAccountApi from "@src/application/api/bank-account.api";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ListItemProps as ItemProps, List, MD3Theme } from "react-native-paper";
import { MCIcons, type IconNames } from "../../../../components/Icons.lib";
import { EditParams } from "../edit";

async function disableAccountBank(id: number) {
  return BankAccountApi.disable({ id });
}
async function enableAccountBank(id: number) {
  return BankAccountApi.enable({ id });
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
          icon={({ color, size }) =>
            <MCIcons name="bank-outline" {...{ color, size }} />
          }
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
        left={(props) => (
          <List.Icon
            {...props}
            icon={({ color, size }) =>
              <MCIcons name="pencil" {...{ color, size }} />
            }
          />
        )}
        onPress={async () => {
          const transfers_method_type = await BankAccountApi.list_all_transfers_methods_type({ id: bank_account.id })
          if (!transfers_method_type) {
            Alert.alert("Erro ao buscar métodos de transferência.");
            return;
          }
          navigateToEditPage({
            id: bank_account.id,
            nickname: bank_account.nickname
          });
        }}
      />
      <ListItem
        title={`${bank_disable ? "H" : "Des"}abilitar conta bancária`}
        color={theme.colors.inverseSurface}
        icon={`bank${bank_disable ? "-" : "-off-"}outline`}
        onPress={async () => {
          if (!bank_disable) {
            const result = await disableAccountBank(bank_account.id);
            if (!result) {
              Alert.alert(
                "Erro ao desabilitar conta bancária.",
                "Ocorreu um erro ao tentar desabilitar a conta bancária."
              );
              return;
            }
            setBank_disable(result.is_disabled);
          } else {
            const result = await enableAccountBank(bank_account.id);
            if (!result) {
              Alert.alert(
                "Erro ao habilitar conta bancária!",
                "Ocorreu um erro ao tentar habilitar a conta bancária."
              );
              return;
            }
            setBank_disable(result.is_disabled);
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
  icon: IconNames<typeof MCIcons>;
}

function ListItem({ title, color, icon, onPress }: ListItemProps) {
  return (
    <List.Item
      title={title}
      left={(props) => (
        <List.Icon
          {...props}
          icon={(props) => (
            <MCIcons name={icon} {...props}/>
          )}
          color={color}
        />
      )}
      titleStyle={{ color }}
      onPress={onPress}
    />
  );
}