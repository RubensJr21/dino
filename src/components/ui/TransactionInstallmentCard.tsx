import Button from '@components/ui/Button';
import { MCIcons } from '@lib/icons.lib';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";

interface TransactionInstallmentCardProps {
  startDate: Date;
  description: string;
  method: string;
  tag: string;
  installmentsNumber: number;
  totalAmount: number;
  onToggleIsDisabled: () => void;
  onEdit: () => void
  goToDetails: () => void
}

export function TransactionInstallmentCard({
  startDate,
  description,
  method,
  tag,
  installmentsNumber,
  totalAmount,
  onToggleIsDisabled,
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
        {tag}
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
              onPress={onEdit}
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
          <Text variant='titleSmall' style={[styles.description, { color: theme.colors.onSurface }]}>
            {method}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions style={{ paddingRight: 15, marginBottom: 5, justifyContent: "space-between" }}>
        <View
          style={[styles.valuesAndCurrency]}
        >
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
          onPress={goToDetails}
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
  method: {
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