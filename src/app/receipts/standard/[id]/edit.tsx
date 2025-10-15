import { TransactionStandardEditScreen } from "@pages/FormScreens/Standard/edit";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function StandardEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/receipts/standard"} />
    return;
  }

  return <TransactionStandardEditScreen id={id} kind="receipt" />
}