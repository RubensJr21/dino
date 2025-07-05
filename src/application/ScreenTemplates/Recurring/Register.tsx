import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import InputDatePicker, { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import InputDescription, { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { EditRecurringScreenParams as RegisterParams } from "@src/application/types/screens/RecurringScreenParams";
import { ScrollView, StyleSheet, View } from "react-native";
import InputRecurring, { useRefInputRecurring } from "../../components/Input/InputRecurring";
import TagPicker, { useRefTagPicker } from "../../components/TagPicker";

interface RecurringRegisterScreenTemplateProps {
  variant: 'receipt' | 'payment'
  submitAction: (data: RegisterParams) => void
}

export default function RecurringRegisterScreenTemplate({ variant, submitAction }: RecurringRegisterScreenTemplateProps) {
  const type = variant === "receipt" ? "recebimento" : "pagamento"

  const placeholderDescription = `${variant === 'receipt' ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${type}:`
  const labelCurrency = `Valor do ${type}:`

  const refDescription = useRefInputDescription();
  const refDatePicker = useRefInputDatePicker();
  const refCurrency = useRefInputCurrency();
  const refRecurring = useRefInputRecurring("monthly");
  const refTagPicker = useRefTagPicker("others");

  return (
    <BasePageView>
      <ScrollView>
        <BasePageTitle>Registrar {type}</BasePageTitle>
        <View style={styles.view_form}>
          <InputDescription placeholder={placeholderDescription} {...{ refDescription }} />
          <InputDatePicker label={labelDate} {...{ refDatePicker }} />
          <InputCurrency label={labelCurrency} {...{ refCurrency }} />

          <TagPicker {...{ refTagPicker }} />

          {/*
            TransferMethodPicker
            1. Precisa selecionar de qual banco vai transferir
            1.1 O sistema vai buscar os métodos de transferência disponíveis daquela conta
            2. Precisa selecionar o método de transferência

            <BankPicker />
            <TransferMethodOfBankPicker />
          */}
          <InputRecurring {...{refRecurring}} />

          <SubmitButton variant="Add" onPress={() => {
            submitAction({
              id: 0,
              description: refDescription.value.current,
              date: refDatePicker.dateRef.current,
              currency: refCurrency.currencyRef.current,
              tag: refTagPicker.value.current,
              recurring: refRecurring.value.current,
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