import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import InputDatePicker, { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import InputDescription, { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { EditInstallmentScreenParams } from "@src/application/types/screens/InstallmentScreenParams";
import { ScrollView, StyleSheet, View } from "react-native";
import TagPicker, { useRefTagPicker } from "../../components/TagPicker";
import { TextBold } from "../../components/Text/TextBold";

interface InstallmentEditScreenTemplateProps {
  variant: 'receipt' | 'payment';
  value: EditInstallmentScreenParams;
  submitAction: (data: EditInstallmentScreenParams) => void;
}

export default function InstallmentEditScreenTemplate({ variant, value, submitAction }: InstallmentEditScreenTemplateProps) {
  const { id, description, date, currency, tag } = value

  const type = variant === "receipt" ? "recebimento" : "pagamento"

  const placeholderDescription = `${variant === 'receipt' ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${type}:`
  const labelCurrency = `Valor do ${type}:`

  const refDescription = useRefInputDescription(description);
  const refDatePicker = useRefInputDatePicker(date);
  const refCurrency = useRefInputCurrency(currency);
  const refTagPicker = useRefTagPicker(tag);

  return (
    <BasePageView>
      <ScrollView>
        <BasePageTitle>
          Edição de {type} - ({id}) <TextBold children={description} />
        </BasePageTitle>
        <View style={styles.view_form}>
          <InputDescription placeholder={placeholderDescription} {...{ refDescription }} />
          <InputDatePicker label={labelDate} {...{ refDatePicker }} />
          <InputCurrency label={labelCurrency} {...{ refCurrency }} />

          {
            // TODO: Criar elemento de selecionar quantidade de parcelas
            // <InputInstallmentsNumber />
          }

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

          <SubmitButton variant="Edit" onPress={() => {
            submitAction(value)
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