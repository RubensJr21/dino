import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentEditScreenTemplate from "@src/application/components/ScreenTemplates/Installment/Edit";
import { EditInstallmentScreenParams } from "@src/application/types/screens/InstallmentScreenParams";
import { PaymentsInstallmentStackParamList } from "./routes";

type Props = BottomTabScreenProps<PaymentsInstallmentStackParamList, 'Edit'>;

export default function EditInstallment({route, navigation}: Props) {
  const handleButton = (data: EditInstallmentScreenParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <InstallmentEditScreenTemplate
      variant="payment"
      value={route.params}
      submitAction={handleButton}
    />
  );
}