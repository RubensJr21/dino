import { Picker } from "@react-native-picker/picker";
import BankAccountApi from "@src/application/api/bank-account.api";
import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useTheme } from "react-native-paper";

interface BankPickerItem {
  id: number;
  label: IBankAccount["nickname"];
}


function mapper_bank_picker_item(bank: BankAccount): BankPickerItem {
  const { id, nickname: label } = bank
  return {
    id,
    label
  }
}

export function BankPicker() {
  const theme = useTheme();
  const [banks, setBanks] = useState<BankPickerItem[]>([{
    id: 1,
    label: "Primeiro Banco"
  }])

  // Receber uma lista de bancos e seus ids
  useEffect(() => {
    BankAccountApi.list_all().then((banks) => {
      if(banks === undefined){
        Alert.alert("Erro ocorreu ao carregar os bancos!", "Não foi possível carregar os bancos.")
        return;
      }
      setBanks(banks.map(mapper_bank_picker_item))
    })
  })

  return (
    <View>
      <Picker
        style={{
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.elevation.level4,
        }}
        dropdownIconColor={theme.colors.onSurface}
      >
        {
          banks.map(({ id, label }) => (
            <Picker.Item key={id} label={label} value={id} />
          ))
        }
      </Picker>
    </View>
  )
}