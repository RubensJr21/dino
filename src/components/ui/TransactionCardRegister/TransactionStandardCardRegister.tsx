import { MCIcons } from '@lib/icons.lib';
import { StandardScreenInsert } from '@lib/types';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";

interface TransactionStandardCardRegisterProps {
  data: StandardScreenInsert
}

export function TransactionStandardCardRegister({
  data: {
    tagSelected: tag,
    description,
    scheduledAt,
    bankSelected: bank,
    transferMethodSelected: method,
    amountValue
  }
}: TransactionStandardCardRegisterProps) {
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

        subtitle={scheduledAt.toLocaleDateString()}
        subtitleVariant='bodySmall'
      />
      <Card.Content>
        <Text variant='titleSmall' style={[styles.method, { color: bankIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {bankIsEmpty ? "Selecione um banco..." : bank}
        </Text>
        <Text variant='titleSmall' style={[styles.method, { color: methodIsEmpty ? theme.colors.outline : theme.colors.onSurface }]}>
          {methodIsEmpty ? "Selecione um método de transferência..." : method}
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
  method: {
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