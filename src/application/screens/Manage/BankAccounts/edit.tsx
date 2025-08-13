import BankAccountApi from "@src/application/api/bank-account.api";
import { TextBold } from "@src/application/components/Text/TextBold";
import InputBankName, {
  useRefInputBankName,
} from "@src/application/screens/Manage/BankAccounts/components/InputBankName";
import { createTogglesRef, TransferMethodsToggles } from "@src/application/screens/Manage/BankAccounts/components/TransferMethodsToggle";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export interface EditParams {
  id: number;
  nickname: string;
}

function getValuesRef(togglesRef: Record<TypeOfTransferMethods, React.RefObject<{ value: boolean }>>) {
  return Object.fromEntries(
    Object.entries(togglesRef).map(([key, ref]) => [key, ref.current?.value ?? true])
  ) as Record<TypeOfTransferMethods, boolean>;
}

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { useEffect, useState } from "react";
import { BankAccountsStackParamList } from "./routes";

type Props = NativeStackScreenProps<BankAccountsStackParamList, 'Edit'>;

export default function Edit({ route, navigation }: Props) {
  const {
    id,
    nickname,
  } = route.params

  const togglesRef = createTogglesRef();
  const [transfer_methods, setTransferMethods] = useState<Record<TypeOfTransferMethods, boolean>>(getValuesRef(togglesRef))

  useEffect(() => {
    navigation.setOptions({
      title: `Edição da conta: ${nickname}`,
    });
    BankAccountApi.list_all_transfers_methods_type({ id }).then((transfer_methods) => {
      if (transfer_methods === undefined) {
        Alert.alert("Erro ocorreu ao carregar os métodos de pagamento!", "Não foi possível carregar os métodos de pagamento.")
        return;
      }
      const transfer_method_entries = transfer_methods.map((value) => (
        [value.transfer_method.method, value.is_disabled] as [TypeOfTransferMethods, boolean]
      ));

      const transfer_methods_values = Object.fromEntries(transfer_method_entries) as Record<TypeOfTransferMethods, boolean>;
      setTransferMethods(transfer_methods_values);
    });

  }, [navigation, nickname]);

  const inputBankNameRef = useRefInputBankName(nickname);

  const handleButton = async (): Promise<BankAccount | undefined> => {
    const new_nickname = inputBankNameRef.bank_name.current;

    if (new_nickname === undefined || new_nickname === "") {
      Alert.alert("Por favor, preencha o campo de nome da conta.");
      return;
    }
    BankAccountApi.edit({
      id,
      new_nickname,
      type_of_bank_transfers: getValuesRef(togglesRef)
    })
  };

  return (
    <BasePageView>
      <ScrollView>
        <BasePageTitle>
          Edição da conta no <TextBold>{nickname}</TextBold>
        </BasePageTitle>
        <View style={styles.view_form}>
          <InputBankName
            refBankName={inputBankNameRef}
          />

          <View style={styles.view_transfer_methods}>
            <Text
              style={styles.title_transfer_methods}
              children={"Métodos de transferência:"}
              variant="headlineLarge"
              numberOfLines={2}
            />
            <TransferMethodsToggles
              data={togglesRef}
              initialValues={transfer_methods}
            />
          </View>

          <SubmitButton variant="Edit" onPress={async () => {
            const result = await handleButton();
            if (result === undefined) {
              Alert.alert("Erro ao atualizar conta bancária.");
              return;
            }
            Alert.alert("Conta bancária atualizada com sucesso!");
            navigation.popTo("Home", {
              last_bank_account_modified: result.nickname
            });
          }} />
        </View>
      </ScrollView>
    </BasePageView>
  );
}

const styles = StyleSheet.create({
  title_transfer_methods: {
    width: "75%",
    alignSelf: "center",
    textAlign: "center"
  },
  view_transfer_methods: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  view_form: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
});
