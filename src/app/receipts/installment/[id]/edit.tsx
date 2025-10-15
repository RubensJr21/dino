import { TransactionInstallmentEditScreen } from "@pages/FormScreens/Installment/edit";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function InstallmentEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    return <Redirect href={"/receipts/installment"} />;
  }

  return <TransactionInstallmentEditScreen id={id} kind="receipt" />
}