import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import InputDatePicker, { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import InputDescription, { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextBold } from "../../Text/TextBold";

interface StandardEditScreenTemplateProps {
  variant: 'receipt' | 'payment'
  value: EditStandardScreenParams
  submitAction: (params: EditStandardScreenParams) => void
}

export default function StandardEditScreenTemplate({ variant, value, submitAction }: StandardEditScreenTemplateProps) {
  const { id, description, date, currency } = value

  const type = variant === "receipt" ? "recebimento" : "pagamento"

  const placeholderDescription = `${variant === 'receipt' ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${type}:`
  const labelCurrency = `Valor do ${type}:`

  const refDescription = useRefInputDescription(description);
  const refDatePicker = useRefInputDatePicker(date);
  const refCurrency = useRefInputCurrency(currency);

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