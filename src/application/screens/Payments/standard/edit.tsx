import TitlePage from "@app-components/TitlePage";
import BaseView from "@src/application/components/BaseView";
import { MdiNamesIcon } from "@src/application/components/ChooseIcon";
import {
  useRefInputCurrency,
} from "@src/application/components/Input/Currency/InputCurrency";
import {
  useRefInputDatePicker,
} from "@src/application/components/Input/InputDatePicker";
import {
  useRefInputDescription,
} from "@src/application/components/Input/InputDescription";
import { TextBold } from "@src/application/components/TextBold";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface EditStandardParams {
  id: number;
  description: string;
  date: DateString;
  currency: number;
}

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DateString } from "@src/application/functions/date2String";
import InputCurrencyPayment from "../components/InputCurrencyPayment";
import InputDatePickerPayment from "../components/InputDatePickerPayment";
import InputDescriptionPayment from "../components/InputDescriptionPayment";
import { PaymentsStandardStackParamList } from "./routes";

type EditStandardProps = BottomTabScreenProps<PaymentsStandardStackParamList, 'Edit'>;

export default function EditStandard({route, navigation}: EditStandardProps) {
  // Obtendo os parâmetros da rota
  const { id, description, date, currency } = route.params

  const inputDescriptionRef = useRefInputDescription(description);
  const inputDatePickerRef = useRefInputDatePicker(date);
  const inputCurrencyRef = useRefInputCurrency(currency);

  const handleButton = () => {
    console.log({
      description: inputDescriptionRef.value,
      date: inputDatePickerRef.dateRef.current,
      currency: inputCurrencyRef.currencyRef.current,
    });
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <BaseView>
      <ScrollView>
        <TitlePage>
          Edição de pagamento - ({id}) <TextBold>{description}</TextBold>
        </TitlePage>
        <View style={styles.view_form}>
          <InputDescriptionPayment refDescription={inputDescriptionRef} />
          <InputDatePickerPayment refDatePicker={inputDatePickerRef} />
          <InputCurrencyPayment refCurrency={inputCurrencyRef} />
          <EditButton onPress={handleButton} />
        </View>
      </ScrollView>
    </BaseView>
  );
}

interface EditButtonProps {
  onPress: () => void;
}

const EditButton = ({ onPress }: EditButtonProps) => {
  return (
    <Button
      mode="contained"
      icon={"pencil" as MdiNamesIcon}
      contentStyle={{ flexDirection: "row-reverse" }}
      onPress={onPress}
    >
      Editar pagamento
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