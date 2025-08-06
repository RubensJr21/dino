import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ValueFormRegisterTemplate } from "@src/application/templates/FormRegisterTemplate";
import StandardRegisterScreenTemplate from "@src/application/templates/screens/Standard/Register";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { ReceiptsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsStandardStackParamList, 'Register'>;

export default function RegisterStandard({ route, navigation }: Props) {
  const handleButton = (data: ValueFormRegisterTemplate) => {
      // TODO: Implementar chamada ao endpoint de registro
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após registrar
  };

  return (
    <StandardRegisterScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Receipt}
      submitAction={handleButton}
    />
  )
}