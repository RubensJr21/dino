import InstallmentScreenBase from "@src/template/pages/TransactionScreenBase/InstallmentScreenBase";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function InstallmentEdit() {
  const { id } = useLocalSearchParams<{id?: string}>()

  if (!id) {
    <Redirect href={"/payments/installment"} />
  }

  return <InstallmentScreenBase id={id} kind="payment" /> 
}