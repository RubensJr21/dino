import { InstallmentViewerBase } from "@pages/ViewerScreenBase/InstallmentViewerBase";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function InstallmentView() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    return <Redirect href={"/payments/installment"} />
  }

  // const handlePress = () => setExpanded(!expanded);

  // TELA GERAL:
  // Card

  // CADA ITEM:
  // Qual parcela (mês ou data)
  // Valor
  // Processado ou não (opção de marcar como processado)

  return (
    <InstallmentViewerBase
      id={5}
      dataCard={{
        tagSelected: "Aleatório",
        description: "Minha descrição",
        startDate: new Date(),
        bankSelected: "Banco Teste",
        transferMethodSelected: {
          id: 1,
          label: "Método do Banco Teste"
        },
        amountValue: "500,00",
        installments: "5"
      }}
    />
  );
};