import { TransactionStandardEditScreen } from "@pages/TransactionScreenStandard/edit";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function StandardEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/payments/standard"} />
    return;
  }

  return <TransactionStandardEditScreen id={id} kind="payment" />
}