import BankAccountApi from '@src/application/api/bank-account.api';
import TransferMethodApi from '@src/application/api/transfer-method.api';
import { MCIcons } from '@src/application/components/Icons.lib';
import { IBankAccount } from '@src/core/entities/bank_account.entity';
import { transfer_methods_available, TypeOfTransferMethods } from '@src/core/start_configs';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Text, useTheme } from 'react-native-paper';

interface SelectionTransferMethods_V2Props {
  bank_id?: IBankAccount["id"];
}

export interface SelectionTransferMethods_V2Ref {
  selectionOfTransferMethods: Array<string>;
}

const transferMethodsAvailableKeys = Object.keys(transfer_methods_available)

function parseToCodeMethod(list: Array<string>){
  return list.map(display_text => {
    for (const code_method of transferMethodsAvailableKeys) {
      if(transfer_methods_available[code_method as TypeOfTransferMethods] === display_text){
        return code_method
      }
    }
    return "CODE_FOR_(display_text)_NOT_FOUNDED"
  })
}

const SelectionTransferMethods_V2 = forwardRef<SelectionTransferMethods_V2Ref, SelectionTransferMethods_V2Props>(({ bank_id }, ref) => {
  const theme = useTheme();

  const [available_transfer_methods, set_available_transfer_methods] = useState<Array<{ id: number, method: string }>>([]);
  const [selectionOfTransferMethods, setSelectionOfTransferMethods] = useState<Array<string>>([]);

  useImperativeHandle(ref, () => {
    return { selectionOfTransferMethods: parseToCodeMethod(selectionOfTransferMethods) };
  }, [selectionOfTransferMethods]);

  useEffect(() => {
    TransferMethodApi.list_all()
      .then(tms => {
        if (tms === undefined) {
          Alert.alert(
            "'src/application/screens/Manage/BankAccounts/components/SelectionTransferMethods_V2.tsx' diz:",
            "Não foi possível carregar os métodos de pagamento."
          )
          return;
        }

        set_available_transfer_methods(tms.map((tm) => {
          const { id, method: METHOD_CODE } = tm.properties
          return { id, method: transfer_methods_available[METHOD_CODE as TypeOfTransferMethods] }
          return { id, method: METHOD_CODE }
        }))
      })
      .catch(error => {
        Alert.alert("Erro Crítico!", "Aconteceu algum erro no processamento de 'TransferMethodApi.list_all()'")
      })
  }, [])

  // Só será executado caso bank_id for passado
  useEffect(() => {
    if (bank_id === undefined) {
      return;
    }
    BankAccountApi.list_all_transfers_methods_type({ id: bank_id }).then((transfer_methods) => {
      if (transfer_methods === undefined) {
        Alert.alert(
          "Erro ocorreu ao carregar os métodos de pagamento!",
          "Não foi possível carregar os métodos de pagamento."
        )
        return;
      }

      setSelectionOfTransferMethods(
        transfer_methods
          .filter(ba_tm => ba_tm.is_disabled)
          .map(ba_tm => ba_tm.transfer_method.method)
      )
    });

  }, [bank_id]);

  if (available_transfer_methods.length === 0) {
    // Alert.alert("Não existem métodos de transferências disponíveis ainda...")
    return (
      <ActivityIndicator />
    )
  }

  return (
    <View style={[styles.view_transfer_methods, {
      borderColor: theme.colors.inverseOnSurface,
    }]}>
      <Text
        style={styles.title_transfer_methods}
        children={"Métodos de transferência:"}
        variant="titleLarge"
        numberOfLines={2}
      />
      <MultiSelect
        // mode="modal"
        style={[{
          height: 50,
          borderRadius: 5,
          padding: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
          backgroundColor: theme.colors.elevation.level5
        }]}
        containerStyle={{
          backgroundColor: theme.colors.elevation.level5, // ou outra cor do seu tema
          borderRadius: 7,
          padding: 7,
        }}
        placeholderStyle={[{
          fontSize: 16,
          color: theme.colors.onSurface
        }]}
        selectedStyle={{
          borderRadius: 7
        }}
        // Aqui eu controlo a cor de fundo do container do item selecionado
        activeColor="transparent"
        flatListProps={{
          contentContainerStyle: {
            rowGap: 5,
          },
        }}
        data={available_transfer_methods}
        labelField="method"
        valueField="method"
        placeholder="Selecione o método de transferência..."
        value={selectionOfTransferMethods}
        onChange={(selection, ...rest) => {
          setSelectionOfTransferMethods(selection)
        }}
        renderItem={(item, selected) => {
          return (
            <View
              style={[{
                borderRadius: 7,
                padding: 14,
                backgroundColor: !selected ? theme.colors.elevation.level1 : theme.colors.inversePrimary
              }]}
            >
              <Text
                style={[{
                  color: theme.colors.onSurface
                }]}
              >{item.method}</Text>
            </View>
          )
        }}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity
            onPress={() => unSelect && unSelect(item)}
            style={{ borderRadius: 10, overflow: "hidden", backgroundColor: "transparent" }}
          >
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 14,
                  shadowColor: '#000',
                  marginTop: 8,
                  marginRight: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  backgroundColor: theme.colors.inversePrimary
                }
              ]}
            >
              <Text
                style={{
                  marginRight: 5,
                  fontSize: 16,
                }}
              >{item.method}</Text>
              <MCIcons color={theme.colors.onSurface} name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
);

export default SelectionTransferMethods_V2;
const styles = StyleSheet.create({
  view_transfer_methods: {
    padding: 10,
    gap: 10,
    flexDirection: "column",
    borderWidth: 4,
  },
  title_transfer_methods: {
    width: "75%",
    alignSelf: "center",
    textAlign: "center",
  },
})