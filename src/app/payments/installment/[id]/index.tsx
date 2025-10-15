import { find_installment } from "@data/playground/installment/find";
import { CallToast } from "@lib/call-toast";
import { mapperInstallment } from "@lib/strategies/installment";
import { InstallmentEntity } from "@lib/types";
import { InstallmentViewerBase } from "@pages/DetailScreens/Installment/Page";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export default function InstallmentDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const navigation = useNavigation()
  const [installment, setInstallment] = useState<InstallmentEntity>()

  useEffect(() => {
    const idAsNumber = Number(id)
    if (Number.isNaN(idAsNumber)) {
      CallToast("Valor de id inválido!")
      return navigation.goBack()
    }
    find_installment(idAsNumber)
      .then((installment => {
        if (installment === undefined) {
          CallToast("Erro ao obter transação parcelada!")
          return;
        }
        setInstallment(mapperInstallment(installment))
      }))
  }, [])

  if (id === undefined) {
    return <Redirect href={"/payments/installment"} />
  }

  if (installment === undefined) {
    return null;
  }

  return (
    <InstallmentViewerBase
      id={installment.id}
      dataCard={installment}
    />
  );
};