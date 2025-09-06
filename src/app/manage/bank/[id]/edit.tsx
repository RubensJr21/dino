import { BankFormScreen } from "@pages/BankScreen/form";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function BankEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/manage/bank"} />
  }

  return (
    <BankFormScreen id={id} />
  )
}