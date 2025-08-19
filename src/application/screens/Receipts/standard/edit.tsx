import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ValueFormEditTemplate } from "@src/application/templates/FormEditTemplate";
import StandardEditScreenTemplate from "@src/application/templates/screens/Standard/Edit";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { ReceiptsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsStandardStackParamList, 'Edit'>;

export default function EditStandard({ route, navigation }: Props) {
  const handleButton = (data: ValueFormEditTemplate) => {
    // TODO: Implementar chamada ao endpoint de edição
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