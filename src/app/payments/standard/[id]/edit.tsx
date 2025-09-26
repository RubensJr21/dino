import { TransactionStandardScreen } from "@pages/TransactionScreenStandard/register";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function StandardEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/payments/standard"} />
    return;
  }

  return <TransactionStandardScreen id={id} kind="payment" />
}