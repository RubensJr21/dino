import { mark_standard_as_processed } from '@data/playground/standard/mark_as_processed';
import { mark_standard_as_unprocessed } from '@data/playground/standard/mark_as_unprocessed';
import { CallToast } from '@lib/call-toast';
import { MCIcons } from '@lib/icons.lib';
import { Category, TransactionInstrument } from '@lib/types';
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { getCategoryLabel, getTransferMethodsLabel } from 'start_configs';

interface TransactionStandardCardProps {
  id: string,
  scheduledAt: Date;
  description: string;
  transactionInstrument: TransactionInstrument;
  category: Category;
  status: boolean;
  amountValue: string;
  onEdit: (id: string) => void
}

export function TransactionStandardCard({
  id,
  scheduledAt,
  description,
  transactionInstrument,
  category,
  status: defaultStatus,
  amountValue,
  onEdit,
}: TransactionStandardCardProps) {
  const theme = useTheme()
  const [status, setStatus] = useState(defaultStatus)

  const toggleStatus = useCallback(() => {
    if (status) {
      mark_standard_as_unprocessed(Number(id))
        .then(() => setStatus(false))
        .catch(error => console.error("Erro ao desmarcar standard como processado!", error))
    } else {
      mark_standard_as_processed(Number(id))
        .then(() => setStatus(true))
        .catch(error => console.error("Erro ao marcar standard como processado!", error))
    }
  }, [id, setStatus, status])

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
        subtitle={scheduledAt.toLocaleDateString()}
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
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}>
          <Text variant='headlineSmall' style={[styles.currencyValue, styles.gridCell, { color: theme.colors.onSurface }]}>
            {amountValue}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions
        style={{
          paddingRight: 15,
          marginBottom: 5,
        }}
      >
        <Pressable
          style={[styles.statusRow]}
          onPress={toggleStatus}
        >
          <MCIcons
            name={status ? "check-circle" : "clock-outline"}
            size={theme.fonts.titleLarge.fontSize}
            color={
              status
                ? theme.colors.primary
                : theme.colors.tertiary
            }
          />
          <Text variant='titleLarge' style={[styles.statusText, { color: theme.colors.onSurface }]}>
            {`${status ? "CONCLUÍDO" : "PENDENTE"}`}
          </Text>
        </Pressable>

        <MCIcons
          name={"information"}
          size={theme.fonts.titleLarge.fontSize * .75}
          style={{ alignSelf: "center" }}
          color={theme.colors.inverseSurface}
          onPress={() => CallToast(`Pressione em ${status ? "CONCLUÍDO" : "PENDENTE"} ou no ícone para mudar o status`)}
        />
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
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    marginLeft: 4,
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