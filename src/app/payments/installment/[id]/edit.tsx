import { TransactionInstallmentScreen } from "@pages/TransactionScreenInstallment";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function InstallmentEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    return <Redirect href={"/payments/installment"} />;
  }

  return <TransactionInstallmentScreen id={id} kind="payment" />
}