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
import InputRecurring, {
  RECURRING_TYPE,
  useRefInputRecurring,
} from "@src/application/components/Input/InputRecurring";
import { TextBold } from "@src/application/components/TextBold";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface EditRecurringParams {
  id: number;
  description: string;
  date: Date;
  currency: number;
  recurring: RECURRING_TYPE;
}

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InputCurrencyReceipt from "../components/InputCurrencyReceipt";
import InputDatePickerReceipt from "../components/InputDatePickerReceipt";
import InputDescriptionReceipt from "../components/InputDescriptionReceipt";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Edit'>;

export default function EditRecurring({route, navigation}: Props) {
  // Obtendo os parâmetros da rota
  const { id, description, date, currency, recurring } = route.params

  const inputDescriptionRef = useRefInputDescription(description);
  const inputDatePickerRef = useRefInputDatePicker(date);
  const inputCurrencyRef = useRefInputCurrency(currency);
  const inputRecurringRef = useRefInputRecurring(recurring);

  const handleButton = () => {
    console.log({
      description: inputDescriptionRef.value,
      date: inputDatePickerRef.dateRef.current,
      currency: inputCurrencyRef.currencyRef.current,
      recurring: inputRecurringRef.value.current,
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
          <InputDescriptionReceipt refDescription={inputDescriptionRef} />
          <InputDatePickerReceipt refDatePicker={inputDatePickerRef} />
          <InputCurrencyReceipt refCurrency={inputCurrencyRef}/>
          <InputRecurring refRecurring={inputRecurringRef} />
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