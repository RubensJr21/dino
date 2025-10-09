import { InstallmentScreenInsert } from '@lib/types';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { getTransferMethodsLabel } from 'start_configs';

interface TransactionInstallmentCardViewerProps {
  data: InstallmentScreenInsert
}

export function TransactionInstallmentCardViewer({
  data: {
    category: category,
    description,
    startDate,
    transactionInstrument,
    amountValue,
    installments
  }
}: TransactionInstallmentCardViewerProps) {
  const theme = useTheme()

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
        textStyle={{ color: theme.colors.onPrimaryContainer }}
      >
        {category.code}
      </Chip>
      <Card.Title
        title={description}
        titleVariant='titleLarge'
        titleNumberOfLines={2}
        titleStyle={{ marginTop: 10, color: theme.colors.onSurface }}

        subtitle={`Data de início: ${startDate.toLocaleDateString()}`}
        subtitleVariant='bodySmall'
      />
      <Card.Content>
        <Text variant='titleSmall' style={[styles.transactionInstrument, { color: theme.colors.onSurface }]}>
          {
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
          <Text variant='titleMedium' style={[styles.isDisabledText, styles.gridCell, { color: theme.colors.onSurface }]}>
            Nº Parcelas: {installments}
          </Text>
          <Text variant='headlineSmall' style={[styles.currencyValue, styles.gridCell, { color: theme.colors.onSurface }]}>
            Valor Total:
          </Text>
          <Text variant='headlineSmall' style={[styles.currencyValue, styles.gridCell, { color: theme.colors.onSurface }]}>
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
  transactionInstrument: {
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