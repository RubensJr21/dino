import Button from "@components/ui/base/Button";
import { TextInput } from "@components/ui/base/TextInput";
import * as blc from "@data/playground/balance";
import { type BalanceByOriginReturn } from "@data/playground/balance";
import { CallToast } from "@lib/call-toast";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ReportByOrigin() {
  const [balance, setBalance] = useState<BalanceByOriginReturn>()

  const [monthText, setMonthText] = useState<string>((new Date().getMonth() + 1).toString())
  const [yearText, setYearText] = useState<string>(new Date().getFullYear().toString())

  const load_balance = useCallback(() => {
    const [month, year] = [Number(monthText), Number(yearText)]
    if (!Number.isInteger(month) || !Number.isInteger(year)) {
      CallToast("Valor de mês ou ano são inválidos!")
      return;
    }
    if (!(month >= 1 && month <= 12)) {
      CallToast("Valor de mês ou ano são inválidos!")
      return;
    }
    if (!(year >= 1970)) {
      CallToast("Valor de mês ou ano são inválidos!")
      return;
    }
    blc.get_balance_by_origin(month, year)
      .then(balance => {
        balance.balance_cash.nickname = "Dinheiro"
        setBalance(balance)
      })
      .catch(error => {
        console.error(error)
      })
  }, [monthText, yearText])

  useEffect(() => {
    load_balance()
  }, [])

  if (balance === undefined) {
    return null;
  }

  return (
    <>
      <View style={{ flexDirection: "row", marginHorizontal: 5, marginBottom: 10, columnGap: 7 }}>
        <TextInput
          label="Mês"
          onChangeText={setMonthText}
          value={monthText}
          inputMode="numeric"
          style={styles.text_input}
        />
        <TextInput
          label="Ano"
          onChangeText={setYearText}
          value={yearText}
          inputMode="numeric"
          style={styles.text_input}
        />
        <Button style={{ marginTop: 7 }} onPress={load_balance}>Gerar Relatório</Button>
      </View>
      <FlatList
        data={[balance.balance_cash, ...balance.balance_banks]}
        contentContainerStyle={{ gap: 7 }}
        columnWrapperStyle={{ gap: 7 }}
        renderItem={({ item: balance }) => {
          return (
            <View key={balance.nickname} style={styles.square_view}>
              <Text variant="titleMedium" style={{fontWeight: "bold"}} >{balance.nickname}</Text>
              <View style={{ alignSelf: "flex-end" }}>
                <Text variant="titleSmall">Saldo atual</Text>
                <Text style={{ textAlign: "right" }}>R$ {balance.partial_balance}</Text>
              </View>

              <Text>A receber: R$ {balance.planned_receipts}</Text>
              <Text>A pagar: R$ {balance.planned_payments}</Text>

              <View style={{ position: "absolute", bottom: 10, right: 10, alignSelf: "flex-end" }}>
                <Text variant="titleSmall">Saldo ao final do mês</Text>
                <Text style={{ textAlign: "right" }}>R$ {balance.final_balance}</Text>
              </View>
            </View>
          )
        }}
        numColumns={2}
      />
    </>
  )
}

const styles = StyleSheet.create({
  view_controls: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginBottom: 10,
    columnGap: 7
  },
  text_input: {
    flex: 1,
    marginTop: 0
  },
  square_view: {
    borderWidth: 1,
    borderColor: "white",
    padding: 15,
    flex: 1,
    maxWidth: "48%",
    aspectRatio: 1,   // mantém quadrado
    backgroundColor: "green",
    borderRadius: 7
  },
})