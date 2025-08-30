import Button from '@components/ui/Button';
import { CallToast } from '@lib/call-toast';
import { MCIcons } from '@lib/icons.lib';
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip, Text, useTheme } from "react-native-paper";

interface TransactionRecurringCardProps {
  startDate: Date;
  description: string;
  method: string;
  tag: string;
  isDisabled: boolean;
  onToggleIsDisabled: () => void;
  onEdit: () => void
  goToDetails: () => void
}

export function TransactionRecurringCard({
  startDate,
  description,
  method,
  tag,
  isDisabled: defaultIsDisabled,
  onToggleIsDisabled,
  onEdit,
  goToDetails
}: TransactionRecurringCardProps) {
  const theme = useTheme()
  const [isDisabled, setIsDisabled] = useState(defaultIsDisabled)

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
        <TouchableOpacity
          style={[styles.isDisabledRow]}
          onPress={() => setIsDisabled((prev) => !prev)}
        >
          <MCIcons
            name={!isDisabled ? "calendar-refresh" : "calendar-remove"}
            size={theme.fonts.titleLarge.fontSize}
            color={
              !isDisabled
                ? theme.colors.primary
                : theme.colors.tertiary
            }
          />
          <Text variant='titleLarge' style={[styles.isDisabledText, { color: theme.colors.onSurface }]}>
            {`${!isDisabled ? "HABILITADO" : "DESABILITADO"}`}
          </Text>
          <MCIcons
            name={"information"}
            size={theme.fonts.titleLarge.fontSize * .75}
            color={theme.colors.inverseSurface}
            onPress={() => CallToast(`Pressione em ${!isDisabled ? "HABILITADO" : "DESABILITADO"} ou no ícone para mudar o isDisabled`)}
          />
        </TouchableOpacity>

        <Button
          // Precisa por que o Card.Actions injeta a prop
          mode='contained-tonal'
          style={{ alignSelf: "flex-start" }}
          onPress={goToDetails}
        >
          Detalhes
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
  isDisabledRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2
  },
  isDisabledText: {
    fontSize: 14,
    marginRight: 4,
  },
});