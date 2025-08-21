import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import { useEffect } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { DropdownTypeRef, useRefDropdown } from "../Dropdown/_context";
import { BankAccountDropdownSearchable } from "./_BankAccount";
import { TRANSFER_METHOD_DEFAULT_VALUE, useTransferMethods } from "./_context";
import { TransferMethodDropdownOfBank } from "./_TransferMethodOfBank";

export function useRefTransferMethodDropdown(initialValue?: ITransferMethod["id"]){
  return useRefDropdown<ITransferMethod["id"]>(initialValue ?? -1)
}

interface TransferMethodDropdownProps {
  title: string,
  refTransferMethodDropdown: DropdownTypeRef<ITransferMethod["id"]>;
}

export function TransferMethodDropdownIndex({
  title,
  refTransferMethodDropdown
}: TransferMethodDropdownProps) {
  const theme = useTheme();
  const {
    items,
    choose,
    change_transfer_method
  } = useTransferMethods();

  // Executado na montagem do componente
  useEffect(() => {
    const current = refTransferMethodDropdown.selected.current
    if (current === TRANSFER_METHOD_DEFAULT_VALUE.value) {
      return;
    }
    const transfer_method = items.find(option => {
      option.value === current
    })
    if(transfer_method === undefined){
      return;
    }
    change_transfer_method(transfer_method)
  }, [])

  useEffect(() => {
    if (choose.value === TRANSFER_METHOD_DEFAULT_VALUE.value) {
      return;
    }
    refTransferMethodDropdown.changeSelected(choose.value)
  }, [choose])

  // Significa que ainda não carregou o valor
  if(items.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        borderWidth: 5,
        borderColor: theme.colors.inverseOnSurface,
        padding: 10,
        gap: 10
      }}
    >
      <Text
        style={{
          textAlign: "center",
          textAlignVertical: "center"
        }}
        variant="titleMedium"
      >
        {title}
      </Text>
      <BankAccountDropdownSearchable label="Selecione uma conta bancária" />
      <TransferMethodDropdownOfBank label="Selecione um método de transferência"/>
    </View>
  )
}