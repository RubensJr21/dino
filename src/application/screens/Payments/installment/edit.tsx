import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ValueFormEditTemplate } from "@src/application/templates/FormEditTemplate";
import InstallmentEditScreenTemplate from "@src/application/templates/screens/Installment/Edit";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { PaymentsInstallmentStackParamList } from "./routes";

type Props = BottomTabScreenProps<PaymentsInstallmentStackParamList, 'Edit'>;

export default function EditInstallment({route, navigation}: Props) {
  const handleButton = (data: ValueFormEditTemplate) => {
    // TODO: Implementar chamada ao endpoint de edição
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <InstallmentEditScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Payment}
      value={route.params}
      submitAction={handleButton}
    />
  );
}