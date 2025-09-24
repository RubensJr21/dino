import { MCIcons } from '@lib/icons.lib';
import { RecurringScreenInsert } from '@lib/types';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";

interface TransactionRecurringCardViewerProps {
  data: RecurringScreenInsert
}

export function TransactionRecurringCardViewer({
  data: {
    startDate,
    description,
    transferMethodSelected: method,
    tagSelected: tag,
    amountValue,
    bankSelected: bank,
    frequency
  },
}: TransactionRecurringCardViewerProps) {
  const theme = useTheme()

  const tagIsEmpty = tag.trim() === ""
  const descriptionIsEmpty = description.trim() === ""
  const bankIsEmpty = bank.trim() === ""
  const methodIsEmpty = method.label.trim() === ""
  const frequencyIsEmpty = frequency.trim() === ""
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

        subtitle={`Início em: ${startDate.toLocaleDateString()}`}
        subtitleVariant='bodySmall'
      />
      <Card.Content>
        <Text variant='titleSmall' style={[styles.method, { color: bankIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {bankIsEmpty ? "Selecione um banco..." : bank}
        </Text>
        <Text variant='titleSmall' style={[styles.method, { color: methodIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {methodIsEmpty ? "Selecione um método de transferência..." : method.label}
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
              frequencyIsEmpty
                ? theme.colors.tertiary
                : theme.colors.onPrimaryContainer
            }
          />
          <Text variant='titleLarge' style={[styles.isDisabledText, { color: frequencyIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
            {frequencyIsEmpty ? "..." : frequency}
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