import BasePage from "@components/ui/base/BasePage";
import Button from "@components/ui/base/Button";
import { TextInput } from "@components/ui/base/TextInput";
import * as blc from "@data/playground/balance";
import { type BalanceByOriginReturn } from "@data/playground/balance";
import { CallToast } from "@lib/call-toast";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

function formatCurrencyString(value: string) {
  const onlyNumbers = Number(value.replaceAll(/[^\d-]/g, "")) / 100

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(onlyNumbers);
}

export function amountParseToString(amountNumber: number) {
  return formatCurrencyString(amountNumber.toString())
}

export default function ReportByOrigin() {
  const theme = useTheme()
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

  // useEffect(() => {
  //   load_balance()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      console.log("Recarregando dados da tela de relatório por origem.");
      load_balance()
      console.log("Dados recarregados com sucesso!");

      // O retorno serve para cleanup quando a tela perder o foco
      return () => {
        // console.log("Tela perdeu o foco!");
      };
    }, [])
  );

  return (
    <BasePage>

      <View style={{ flexDirection: "row", marginBottom: 10, columnGap: 7 }}>
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


      {
        balance !== undefined &&
        <FlatList
          data={[balance.balance_cash, ...balance.balance_banks]}
          contentContainerStyle={{ rowGap: 7 }}
          columnWrapperStyle={{ columnGap: 7 }}
          renderItem={({ item: balance }) => {
            return (
              <View key={balance.nickname} style={[styles.square_view, { backgroundColor: theme.colors.inversePrimary }]}>
                <Text variant="titleMedium" style={styles.square_title}>{balance.nickname}</Text>
                <View style={[styles.balance_chip, { backgroundColor: theme.colors.backdrop, borderColor: theme.colors.inverseSurface }]}>
                  <Text style={{ textAlign: "center" }} variant="titleSmall">Saldo atual</Text>
                  <Text style={{ textAlign: "center" }}>R$ {amountParseToString(balance.partial_balance)}</Text>
                </View>

                <Text style={{ textAlign: "center" }}>A receber: R$ {amountParseToString(balance.planned_receipts)}</Text>
                <Text style={{ textAlign: "center" }}>A pagar: R$ {amountParseToString(balance.planned_payments)}</Text>

                <View style={[styles.balance_chip, { backgroundColor: theme.colors.backdrop, borderColor: theme.colors.inverseSurface }]}>
                  <Text style={{ textAlign: "center" }} variant="titleSmall">Saldo ao final do mês</Text>
                  <Text style={{ textAlign: "center" }}>R$ {amountParseToString(balance.final_balance)}</Text>
                </View>
              </View>
            )
          }}
          numColumns={2}
        />
      }

    </BasePage>
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
    maxWidth: "49%",
    aspectRatio: 1,   // mantém quadrado
    borderRadius: 7
  },
  square_title: {
    textAlign: "center",
    fontWeight: "bold"
  },
  balance_chip: {
    alignSelf: "center",
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
  }
})