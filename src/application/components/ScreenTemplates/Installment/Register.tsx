import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import InputDatePicker, { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import InputDescription, { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { EditInstallmentScreenParams as RegisterParams } from "@src/application/types/screens/InstallmentScreenParams";
import { ScrollView, StyleSheet, View } from "react-native";

interface InstallmentRegisterScreenTemplateProps {
  variant: 'receipt' | 'payment'
  submitAction: (data: RegisterParams) => void
}

export default function InstallmentRegisterScreenTemplate({ variant, submitAction }: InstallmentRegisterScreenTemplateProps) {
  const type = variant === "receipt" ? "recebimento" : "pagamento"

  const placeholderDescription = `${variant === 'receipt' ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${type}:`
  const labelCurrency = `Valor do ${type}:`

  const refDescription = useRefInputDescription();
  const refDatePicker = useRefInputDatePicker();
  const refCurrency = useRefInputCurrency();

  return (
    <BasePageView>
      <ScrollView>
        <BasePageTitle>Registrar {type}</BasePageTitle>
        <View style={styles.view_form}>
          <InputDescription placeholder={placeholderDescription} {...{ refDescription }} />
          <InputDatePicker label={labelDate} {...{ refDatePicker }} />
          <InputCurrency label={labelCurrency} {...{ refCurrency }} />

          {
            // TODO: Criar elemento de selecionar quantidade de parcelas
            // <InputInstallmentsNumber />
          }

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

          <SubmitButton variant="Add" onPress={() => {
            submitAction({
              id: 0,
              description: refDescription.value.current,
              date: refDatePicker.dateRef.current,
              currency: refCurrency.currencyRef.current,
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