import Button from "@components/ui/base/Button";
import * as blc from "@data/playground/balance";
import { type BalanceByOriginReturn } from "@data/playground/balance";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function ReportByOrigin() {
  const [balance, setBalance] = useState<BalanceByOriginReturn>()

  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [year, setYear] = useState<number>(new Date().getFullYear())

  const load_balance = useCallback(() => {
    blc.get_balance_by_origin(10, 2025)
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
      <Text>ReportByOrigin</Text>
      <View style={{ borderWidth: 1, borderColor: "red", padding: 5}}>
        <Text>Balanço em Dinheiro</Text>
        <Text>planned: {balance.balance_cash.planned}</Text>
        <Text>executed: {balance.balance_cash.executed}</Text>
      </View>

      <Text>Balanço das contas bancárias:</Text>
      {
        balance.balance_banks.map(balance_bank => {
          return (
            <View key={balance_bank.nickname} style={{ borderWidth: 1, borderColor: "white", padding: 5 }}>
              <Text>nickname: {balance_bank.nickname}</Text>
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