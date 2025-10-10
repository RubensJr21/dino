import Button from '@components/ui/base/Button';
import { MCIcons } from '@lib/icons.lib';
import { Category, TransactionInstrument } from '@lib/types';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { getCategoryLabel, getTransferMethodsLabel } from 'start_configs';

interface TransactionInstallmentCardProps {
  id: string;
  startDate: Date;
  description: string;
  transactionInstrument: TransactionInstrument;
  category: Category;
  installmentsNumber: number;
  totalAmount: number;
  onEdit: (id: string) => void
  goToDetails: (id: string) => void
}

export function TransactionInstallmentCard({
  id,
  startDate,
  description,
  transactionInstrument,
  category,
  installmentsNumber,
  totalAmount,
  onEdit,
  goToDetails
}: TransactionInstallmentCardProps) {
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
        {getCategoryLabel(category.code)}
      </Chip>
      <Card.Title
        title={description}
        titleVariant='titleLarge'
        titleNumberOfLines={2}
        titleStyle={{ marginTop: 10 }}
        subtitle={startDate.toLocaleDateString()}
        subtitleVariant='bodySmall'
        right={
          ({ size }) =>
            <MCIcons
              name='pencil-box'
              onPress={() => onEdit(id)}
              color={theme.colors.primary}
              style={{
                flex: 1,
                paddingTop: 15,
                paddingRight: 12,
              }}
              size={30}
            />
        }
        rightStyle={{
          alignSelf: "flex-start",
        }}
      />
      <Card.Content>
        <View style={{ flexDirection: "row", columnGap: 5 }}>
          <Text variant='titleSmall' style={[styles.transactionInstrument, { color: theme.colors.onSurface }]}>
            {
              [
                getTransferMethodsLabel(transactionInstrument.transfer_method_code),
                transactionInstrument.bank_nickname
              ].filter(v => v != null).join(" - ")
            }
          </Text>
        </View>
      </Card.Content>
      <Card.Actions style={{ paddingRight: 15, marginBottom: 5, justifyContent: "space-between" }}>
        <View style={[styles.valuesAndCurrency]}>
          <Text variant='titleLarge' style={[styles.isDisabledText, { color: theme.colors.onSurface }]}>
            Nº Parcelas {installmentsNumber}
          </Text>
          <Text variant='titleLarge' style={[styles.isDisabledText, { color: theme.colors.onSurface }]}>
            Valor Total {totalAmount}
          </Text>
        </View>

        <Button
          // Precisa por que o Card.Actions injeta a prop
          mode='contained-tonal'
          style={{ alignSelf: "flex-end" }}
          onPress={() => goToDetails(id)}
        >
          Acessar parcelas
        </Button>

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
  transactionInstrument: {
    fontSize: 14,
  },
  valuesAndCurrency: {
    alignItems: "flex-start",
  },
  isDisabledText: {
    fontSize: 14,
    marginRight: 4,
  },
});