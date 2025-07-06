import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import StandardEditScreenTemplate from "@src/application/templates/screens/Standard/Edit";
import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { ReceiptsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsStandardStackParamList, 'Edit'>;

export default function EditStandard({ route, navigation }: Props) {
  const handleButton = (data: EditStandardScreenParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <StandardEditScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Receipt}
      value={route.params}
      submitAction={handleButton}
    />
  );
}