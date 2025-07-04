import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentRegisterScreenTemplate from "@src/application/components/ScreenTemplates/Installment/Register";
import { EditInstallmentScreenParams as RegisterParams } from "@src/application/types/screens/InstallmentScreenParams";
import { ReceiptsInstallmentStackParamList } from "./routes";

type RegisterInstallmentProps = BottomTabScreenProps<ReceiptsInstallmentStackParamList, 'Register'>;

export default function RegisterInstallment({ route, navigation }: RegisterInstallmentProps) {
  const handleButton = (data: RegisterParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após registrar
  };

  return (
    <InstallmentRegisterScreenTemplate
      variant="receipt"
      submitAction={handleButton}
    />
  );
}
