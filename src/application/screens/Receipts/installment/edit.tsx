import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentEditScreenTemplate from "@src/application/templates/screens/Installment/Edit";
import { EditInstallmentScreenParams } from "@src/application/types/screens/InstallmentScreenParams";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { ReceiptsInstallmentStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsInstallmentStackParamList, 'Edit'>;

export default function EditInstallment({route, navigation}: Props) {
  const handleButton = (data: EditInstallmentScreenParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <InstallmentEditScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Receipt}
      value={route.params}
      submitAction={handleButton}
    />
  );
}