import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import StandardEditScreenTemplate from "@src/application/ScreenTemplates/Standard/Edit";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { ReceiptsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsStandardStackParamList, 'Edit'>;

export default function EditStandard({ route, navigation }: Props) {
  const handleButton = (data: EditStandardScreenParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <StandardEditScreenTemplate
      variant="receipt"
      value={route.params}
      submitAction={handleButton}
    />
  );
}