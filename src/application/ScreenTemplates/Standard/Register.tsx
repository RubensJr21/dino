import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import InputDatePicker, { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import InputDescription, { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { EditStandardScreenParams as RegisterParams } from "@src/application/types/screens/StandardScreenParams";
import { ScrollView, StyleSheet, View } from "react-native";
import TagPicker, { useRefTagPicker } from "../../components/TagPicker";

interface StandardRegisterScreenTemplateProps {
  variant: 'receipt' | 'payment'
  submitAction: (params: RegisterParams) => void
}

export default function StandardRegisterScreenTemplate({ variant, submitAction }: StandardRegisterScreenTemplateProps) {
  const placeholderDescription = `${variant === 'receipt' ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${variant === 'receipt' ? "recebimento" : "pagamento"}:`
  const labelCurrency = `Valor do ${variant === 'receipt' ? "recebimento" : "pagamento"}:`

  const refDescription = useRefInputDescription();
  const refDatePicker = useRefInputDatePicker();
  const refCurrency = useRefInputCurrency();
  const refTagPicker = useRefTagPicker("others");

  return (
    <BasePageView>
      <ScrollView>
        <BasePageTitle>Registrar {variant === "receipt" ? "recebimento" : "pagamento"}</BasePageTitle>
        <View style={styles.view_form}>
          <InputDescription placeholder={placeholderDescription} {...{ refDescription }} />
          <InputDatePicker label={labelDate} {...{ refDatePicker }} />
          <InputCurrency label={labelCurrency} {...{ refCurrency }} />
          <TagPicker {...{ refTagPicker }} />

          {/*
          // TODO: Preciso informar para onde está saindo aquele valor
            TransferMethodPicker
            1. Precisa selecionar de qual banco vai transferir
            1.1 O sistema vai buscar os métodos de transferência disponíveis daquela conta
            2. Precisa selecionar o método de transferência

            <BankPicker />
            <TransferMethodOfBankPicker />
          */}

          <SubmitButton variant="Add" onPress={() => {
            submitAction({
              id: 0,
              description: refDescription.value.current,
              date: refDatePicker.dateRef.current,
              currency: refCurrency.currencyRef.current,
              tag: refTagPicker.value.current
            })
          }} />
        </View>
      </ScrollView>
    </BasePageView>
  )
}

const styles = StyleSheet.create({
  view_form: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
});