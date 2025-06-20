import TitlePage from "@app-components/TitlePage";
import BaseView from "@src/application/components/BaseView";
import { MdiNamesIcon } from "@src/application/components/ChooseIcon";
import InputCurrency, {
  useRefInputCurrency,
} from "@src/application/components/Input/Currency/InputCurrency";
import InputDatePicker, {
  useRefInputDatePicker,
} from "@src/application/components/Input/InputDatePicker";
import InputDescription, {
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
import { IncomesRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<IncomesRecurringStackParamList, 'Edit'>;

export default function EditRecurring({route, navigation}: Props) {
  // Obtendo os parâmetros da rota
  const { id, description, date, currency, recurring } = route.params

  const inputDescriptionRef = useRefInputDescription();
  const inputDatePickerRef = useRefInputDatePicker();
  const inputCurrencyRef = useRefInputCurrency();
  const inputRecurringRef = useRefInputRecurring();

  const handleButton = () => {
    console.log({
      currency: inputCurrencyRef.current?.value,
      description: inputDescriptionRef.current?.value,
      date: inputDatePickerRef.current?.value,
      recurring: inputRecurringRef.current?.value,
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
          <InputDescription
            value={description}
            ref={inputDescriptionRef}
          />
          <InputDatePicker
            value={date.toDateString()}
            ref={inputDatePickerRef}
          />
          <InputCurrency
            label={"Valor"}
            value={currency.toString()}
            ref={inputCurrencyRef}
          />
          <InputRecurring
            default_value={recurring}
            ref={inputRecurringRef}
          />
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