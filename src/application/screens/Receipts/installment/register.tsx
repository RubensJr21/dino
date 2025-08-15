import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentRegisterScreenTemplate, { ValueInstallmentRegisterScreenTemplate } from "@src/application/templates/screens/Installment/Register";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { ReceiptsInstallmentStackParamList } from "./routes";

type RegisterInstallmentProps = BottomTabScreenProps<ReceiptsInstallmentStackParamList, 'Register'>;

export default function RegisterInstallment({ route, navigation }: RegisterInstallmentProps) {
  const handleButton = (data: ValueInstallmentRegisterScreenTemplate) => {
    // TODO: Implementar chamada ao endpoint de registro
    console.info(data);
    navigation.goBack(); // Volta para a tela anterior após registrar
  };

  return (
    <InstallmentRegisterScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Receipt}
      submitAction={handleButton}
    />
  );
}
