import { MCIcons } from '@lib/icons.lib';
import { StandardScreenInsert } from '@lib/types';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { getCategoryLabel, getTransferMethodsLabel } from 'start_configs';

interface TransactionStandardCardRegisterProps {
  data: StandardScreenInsert
}

export function TransactionStandardCardRegister({
  data: {
    category,
    description,
    scheduledAt,
    transactionInstrument,
    amountValue
  }
}: TransactionStandardCardRegisterProps) {
  const theme = useTheme()

  const categoryIsEmpty = category.id === -1
  const descriptionIsEmpty = description.trim() === ""
  const transferMethodIsEmpty = transactionInstrument.transfer_method_code === ""
  const transactionInstrumentIsEmpty = transactionInstrument.id === -1
  const amountValueIsZero = Number(amountValue.replaceAll(/\D/g, "")) === 0

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
        textStyle={{ color: categoryIsEmpty ? theme.colors.outline : theme.colors.onPrimaryContainer }}
      >
        {categoryIsEmpty ? "Selecione uma categoria..." : getCategoryLabel(category.code)}
      </Chip>
      <Card.Title
        title={descriptionIsEmpty ? "Escreva uma descrição..." : description}
        titleVariant='titleLarge'
        titleNumberOfLines={2}
        titleStyle={{ marginTop: 10, color: descriptionIsEmpty ? theme.colors.outline : theme.colors.onSurface }}

        subtitle={`Agendado para: ${scheduledAt.toLocaleDateString()}`}
        subtitleVariant='bodySmall'
      />
      <Card.Content>
        <Text variant='titleSmall' style={[styles.transactionInstrument, { color: transferMethodIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {transferMethodIsEmpty ? "Selecione um método de transferência..." : getTransferMethodsLabel(transactionInstrument.transfer_method_code)}
        </Text>
        <Text variant='titleSmall' style={[styles.transactionInstrument, { color: transactionInstrumentIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {transactionInstrumentIsEmpty ? "Selecione um instrumento de transferência..." :
            [
              getTransferMethodsLabel(transactionInstrument.transfer_method_code),
              transactionInstrument.bank_nickname
            ].filter(v => v != null).join(" - ")
          }
        </Text>
        <Text variant='headlineSmall' style={[styles.currencyValue, { color: amountValueIsZero ? theme.colors.outline : theme.colors.onSurface }]}>
          {amountValue}
        </Text>
      </Card.Content>
      <Card.Actions style={{ paddingRight: 15, marginBottom: 5, }}>
        <View style={[styles.statusRow]} >
          <MCIcons
            name="clock-outline"
            size={theme.fonts.titleLarge.fontSize}
            color={theme.colors.tertiary}
          />
          <Text variant='titleLarge' style={[styles.statusText, { color: theme.colors.onSurface }]}>
            PENDENTE
          </Text>
        </View>
      </Card.Actions>
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
  scheduledAt: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionInstrument: {
    fontWeight: "bold",
  },
  currencyValue: {
    fontWeight: "bold",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    marginLeft: 4,
  },
});