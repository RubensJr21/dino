import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import StandardRegisterScreenTemplate from "@src/application/ScreenTemplates/Standard/Register";
import { EditStandardScreenParams as RegisterParams } from "@src/application/types/screens/StandardScreenParams";
import { ReceiptsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsStandardStackParamList, 'Register'>;

export default function RegisterStandard({ route, navigation }: Props) {
  const handleButton = (data: RegisterParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após registrar
  };

  return (
    <StandardRegisterScreenTemplate
      variant="receipt"
      submitAction={handleButton}
    />
  )
}