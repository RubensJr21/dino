import { TransactionInstallmentEditScreen } from "@pages/TransactionScreens/Installment/edit";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function InstallmentEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    return <Redirect href={"/payments/installment"} />;
  }

  return <TransactionInstallmentEditScreen id={id} kind="payment" />
}