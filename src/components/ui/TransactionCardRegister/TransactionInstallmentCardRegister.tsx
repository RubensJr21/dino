import { InstallmentScreenInsert } from '@lib/types';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";

interface TransactionInstallmentCardRegisterProps {
  data: InstallmentScreenInsert
}

export function TransactionInstallmentCardRegister({
  data: {
    tagSelected: tag,
    description,
    startDate,
    bankSelected: bank,
    transferMethodSelected: method,
    amountValue,
    installments
  }
}: TransactionInstallmentCardRegisterProps) {
  const theme = useTheme()

  const tagIsEmpty = tag.trim() === ""
  const descriptionIsEmpty = description.trim() === ""
  const bankIsEmpty = bank.trim() === ""
  const methodIsEmpty = method.trim() === ""
  const amountValueIsZero = Number(amountValue.replace(/\D/, "")) === 0

  return (
    <Card style={[
      styles.card,
      {
        backgroundColor: theme.colors.background,
        overflow: "hidden"
      }
    ]}>
      <Chip
        style={{ backgroundColor: theme.colors.primaryContainer, borderRadius: 0 }}
        textStyle={{ color: tagIsEmpty ? theme.colors.outline : theme.colors.onPrimaryContainer }}
      >
        {tagIsEmpty ? "Selecione uma categoria..." : tag}
      </Chip>
      <Card.Title
        title={descriptionIsEmpty ? "Escreva uma descrição..." : description}
        titleVariant='titleLarge'
        titleNumberOfLines={2}
        titleStyle={{ marginTop: 10, color: descriptionIsEmpty ? theme.colors.outline : theme.colors.onSurface }}

        subtitle={startDate.toLocaleDateString()}
        subtitleVariant='bodySmall'
      />
      <Card.Content>
        <Text variant='titleSmall' style={[styles.method, { color: bankIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {bankIsEmpty ? "Selecione um banco..." : bank}
        </Text>
        <Text variant='titleSmall' style={[styles.method, { color: methodIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {methodIsEmpty ? "Selecione um método de transferência..." : method}
        </Text>
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}>
          <Text variant='titleMedium' style={[styles.isDisabledText, styles.gridCell, { color: theme.colors.onSurface }]}>
            Nº Parcelas: {installments}
          </Text>
          <Text variant='headlineSmall' style={[styles.currencyValue, styles.gridCell, { color: amountValueIsZero ? theme.colors.outline : theme.colors.onSurface }]}>
            Valor Total:
          </Text>
          <Text variant='headlineSmall' style={[styles.currencyValue, styles.gridCell, { color: amountValueIsZero ? theme.colors.outline : theme.colors.onSurface }]}>
            {amountValue}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  startDate: {
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  method: {
    fontSize: 14,
  },
  currencyValue: {
    fontWeight: "bold",
    textAlign: "right",
  },
  valuesAndCurrency: {
    alignItems: "flex-start",
  },
  isDisabledText: {
    marginRight: 4,
  },
  gridCell: {
    flexGrow: 1,          // ocupa o máximo possível
    flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
  }
});