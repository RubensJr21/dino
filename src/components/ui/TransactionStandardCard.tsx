import { CallToast } from '@lib/call-toast';
import { MCIcons } from '@lib/icons.lib';
import { Category, TransactionInstrument } from '@lib/types';
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";

interface TransactionStandardCardProps {
  scheduledAt: Date;
  description: string;
  transactionInstrument: TransactionInstrument;
  category: Category;
  status: boolean;
  onToggleStatus: () => void;
  onEdit: () => void
}

export function TransactionStandardCard({
  scheduledAt,
  description,
  transactionInstrument,
  category,
  status: defaultStatus,
  onToggleStatus,
  onEdit,
}: TransactionStandardCardProps) {
  const theme = useTheme()
  const [status, setStatus] = useState(defaultStatus)

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
        titleStyle={{ marginTop: 10 }}
        subtitle={scheduledAt.toLocaleDateString()}
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
        <View style={{flexDirection: "row", columnGap: 5}}>
          {/* <MCIcons
            name={"arrow-left-right"}
            size={theme.fonts.titleSmall.fontSize}
            style={{ alignSelf: "center" }}
            color={theme.colors.inverseSurface}
            onPress={() => CallToast(`Pressione em ${status ? "CONCLUÍDO" : "PENDENTE"} ou no ícone para mudar o status`)}
          /> */}
          <Text variant='titleSmall' style={[styles.description, { color: theme.colors.onSurface }]}>
            {transactionInstrument.nickname}
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
          onPress={() => setStatus((prev) => !prev)}
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
});