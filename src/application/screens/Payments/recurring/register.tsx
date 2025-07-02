import TitlePage from "@app-components/TitlePage";
import BaseView from "@src/application/components/BaseView";
import { MdiNamesIcon } from "@src/application/components/ChooseIcon";
import { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InputRecurring, { useRefInputRecurring } from "@src/application/components/Input/InputRecurring";
import InputCurrencyPayment from "../components/InputCurrencyPayment";
import InputDatePickerPayment from "../components/InputDatePickerPayment";
import InputDescriptionPayment from "../components/InputDescriptionPayment";
import { PaymentsRecurringStackParamList } from "./routes";

type RegisterRecurringProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Register'>;

export default function RegisterRecurring({ route, navigation }: RegisterRecurringProps) {
  const inputDescriptionRef = useRefInputDescription();
  const inputDatePickerRef = useRefInputDatePicker();
  const inputCurrencyRef = useRefInputCurrency();
  const inputRecurringRef = useRefInputRecurring("mensalmente");

  const handleButton = () => {
    console.log({
      description: inputDescriptionRef.value,
      date: inputDatePickerRef.dateRef.current,
      currency: inputCurrencyRef.currencyRef.current,
      recurring: inputRecurringRef.value.current,
    });
    navigation.goBack(); // Volta para a tela anterior após registrar
  };
  
  return (
    <BaseView>
      <ScrollView>
        <TitlePage>Registrar pagamento</TitlePage>
        <View style={styles.view_form}>
          <InputDescriptionPayment refDescription={inputDescriptionRef} />
          <InputDatePickerPayment refDatePicker={inputDatePickerRef} />
          <InputCurrencyPayment refCurrency={inputCurrencyRef} />
          <InputRecurring refRecurring={inputRecurringRef} />

          {
            // TODO: Preciso informar para onde está saindo aquele valor
            /*
              Esses valores podem ser carregados do banco de dados logo que o aplicativo iniciar e podem ser armazenados em um async storage
              ou em um estado global, como Redux ou Context API.
              
              <TagPicker />
              Vindo do banco de dados, as tags são:
              [ Educação, Saúde, Lazer, Alimentação, Moradia, Transporte, Serviços, Compras, Impostos/Taxas e Outros ]
            */
          }

          {/*
            TransferMethodPicker
            1. Precisa selecionar de qual banco vai transferir
            1.1 O sistema vai buscar os métodos de transferência disponíveis daquela conta
            2. Precisa selecionar o método de transferência

            <BankPicker />
            <TransferMethodOfBankPicker />
          */}

          <RegisterButton onPress={handleButton} />
        </View>
      </ScrollView>
    </BaseView>
  );
}

interface RegisterButtonProps {
  onPress: () => void;
}

const RegisterButton = ({ onPress }: RegisterButtonProps) => {
  return (
    <Button
      mode="contained"
      icon={"plus-box" as MdiNamesIcon}
      contentStyle={{ flexDirection: "row-reverse" }}
      onPress={onPress}
    >
      Registrar pagamento
    </Button>
  );
};

const styles = StyleSheet.create({
  view_form: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
});
