import Button from "@components/ui/base/Button";
import * as blc from "@data/playground/balance";
import { BalanceByCategoryReturn } from "@data/playground/balance";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function ReportByCategory() {
  const [balance, setBalance] = useState<BalanceByCategoryReturn>()

  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [year, setYear] = useState<number>(new Date().getFullYear())

  const load_balance = useCallback(() => {
    blc.get_balance_by_category(10, 2025)
      .then(balance => {
        console.log(balance)
        setBalance(balance)
      })
      .catch(error => {
        console.error(error)
      })
  }, [month, year])

  useEffect(() => {
    load_balance()
  }, [])

  if (balance === undefined) {
    return null;
  }

  return (
    <>
      <Text>ReportByCategory</Text>
      <Text>Balanço das contas bancárias:</Text>
      {
        balance.map(balance_bank => {
          return (
            <View key={balance_bank.category} style={{ borderWidth: 1, borderColor: "white", padding: 5 }}>
              <Text>category: {balance_bank.category}</Text>
              <Text>planned: {balance_bank.planned}</Text>
              <Text>executed: {balance_bank.executed}</Text>
            </View>
          )
        })
      }
      <Button onPress={load_balance}>Chamar Report</Button>
    </>
  )
}