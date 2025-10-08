import { MCIcons } from '@lib/icons.lib';
import { RecurringScreenInsert } from '@lib/types';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { getTransferMethodsLabel } from 'start_configs';

interface TransactionRecurringCardRegisterProps {
  data: RecurringScreenInsert
}

export function TransactionRecurringCardRegister({
  data: {
    startDate,
    description,
    transactionInstrument,
    category,
    amountValue,
    recurrenceType
  },
}: TransactionRecurringCardRegisterProps) {
  const theme = useTheme()

  const categoryIsEmpty = category.id === -1
  const descriptionIsEmpty = description.trim() === ""
  const transferMethodIsEmpty = transactionInstrument.transfer_method_code === ""
  const transactionInstrumentIsEmpty = transactionInstrument.id === -1
  const recurrenceTypeIsEmpty = recurrenceType.id === -1
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
        textStyle={{ color: categoryIsEmpty ? theme.colors.outline : theme.colors.onPrimaryContainer }}
      >
        {categoryIsEmpty ? "Selecione uma categoria..." : category.code}
      </Chip>
      <Card.Title
        title={descriptionIsEmpty ? "Escreva uma descrição..." : description}
        titleVariant='titleLarge'
        titleNumberOfLines={2}
        titleStyle={{ marginTop: 10, color: descriptionIsEmpty ? theme.colors.outline : theme.colors.onSurface }}

        subtitle={`Início em: ${startDate.toLocaleDateString()}`}
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
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}>
          <Text variant='headlineSmall' style={[styles.currencyValue, styles.gridCell, { color: amountValueIsZero ? theme.colors.outline : theme.colors.onSurface }]}>
            {amountValue}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions style={{ paddingRight: 15, marginBottom: 5, justifyContent: "space-between" }}>
        <View style={[styles.isDisabledRow]}>
          <MCIcons
            name={"refresh"}
            size={theme.fonts.titleLarge.fontSize}
            color={
              recurrenceTypeIsEmpty
                ? theme.colors.tertiary
                : theme.colors.onPrimaryContainer
            }
          />
          <Text variant='titleLarge' style={[styles.isDisabledText, { color: recurrenceTypeIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
            {recurrenceTypeIsEmpty ? "..." : recurrenceType.code}
          </Text>
        </View>
        <View style={[styles.isDisabledRow]}>
          <MCIcons
            name={"calendar-refresh"}
            size={theme.fonts.titleLarge.fontSize}
            color={theme.colors.primary}
          />
          <Text variant='titleLarge' style={[styles.isDisabledText, { color: theme.colors.onSurface }]}>
            Habilitado
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
  startDate: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionInstrument: {
    fontWeight: "bold",
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
  isDisabledRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2
  },
  isDisabledText: {
    marginRight: 4,
    textTransform: 'capitalize',
  },
  currencyValue: {
    fontWeight: "bold",
    textAlign: "right",
  },
  gridCell: {
    flexGrow: 1,          // ocupa o máximo possível
    flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
  }
});