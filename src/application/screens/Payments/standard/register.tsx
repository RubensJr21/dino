import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import StandardRegisterScreenTemplate from "@src/application/templates/screens/Standard/Register";
import { EditStandardScreenParams as RegisterParams } from "@src/application/types/screens/StandardScreenParams";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { PaymentsStandardStackParamList } from "./routes";

type RegisterStandardProps = BottomTabScreenProps<PaymentsStandardStackParamList, 'Register'>;

export default function RegisterStandard({ route, navigation }: RegisterStandardProps) {
  const handleButton = (data: RegisterParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após registrar
  };
  
  return (
    <StandardRegisterScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Payment}
      submitAction={handleButton}
    />
  )
}