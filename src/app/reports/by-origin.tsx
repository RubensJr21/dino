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
      <View>
        <View style={{ borderWidth: 1, borderColor: "green", padding: 5 }}>
          <Text>Origem: {balance.balance_cash.nickname}</Text>
          <Text>Saldo até o momento: {balance.balance_cash.partial_balance}</Text>
          <Text>Valores a receber: {balance.balance_cash.planned_receipts}</Text>
          <Text>Valores a pagar: {balance.balance_cash.planned_payments}</Text>
          <Text>Saldo ao final do mês: {balance.balance_cash.final_balance}</Text>
        </View>

        {
          balance.balance_banks.map(balance_bank => {
            return (
              <View key={balance_bank.nickname} style={{ borderWidth: 1, borderColor: "white", padding: 5 }}>
                <Text>Origem: {balance_bank.nickname}</Text>
                <Text>Saldo até o momento: {balance_bank.partial_balance}</Text>
                <Text>Valores a receber: {balance_bank.planned_receipts}</Text>
                <Text>Valores a pagar: {balance_bank.planned_payments}</Text>
                <Text>Saldo ao final do mês: {balance_bank.final_balance}</Text>
              </View>
            )
          })
        }
      </View>
      <Button onPress={load_balance}>Chamar Report</Button>
    </>
  )
}