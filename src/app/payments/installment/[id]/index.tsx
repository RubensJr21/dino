import { InstallmentViewerBase } from "@pages/DetailScreens/Installment/Page";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function InstallmentView() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    return <Redirect href={"/payments/installment"} />
  }

  // TELA GERAL:
  // Card

  // CADA ITEM:
  // Qual parcela (mês ou data)
  // Valor
  // Processado ou não (opção de marcar como processado)

  // TODO: Remover mock

  return (
    <InstallmentViewerBase
      id={5}
      dataCard={{
        description: "Minha descrição",
        startDate: new Date(),
        amountValue: "500,00",
        installments: "5",
        category: {
          id: 1,
          code: "alimentação",
        },
        transactionInstrument: {
          id: 1,
          nickname: "Cartão Teste",
          transfer_method_code: "banco-teste-cartaoteste",
          bank_nickname: null
        }
      }}
    />
  );
};