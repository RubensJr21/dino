import BankAccountApi from '@src/application/api/bank-account.api';
import TransferMethodApi from '@src/application/api/transfer-method.api';
import { MCIcons } from '@src/application/components/Icons.lib';
import { IBankAccount } from '@src/core/entities/bank_account.entity';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Text, useTheme } from 'react-native-paper';

interface SelectTransferMethods_V2Props {
  bank_id?: IBankAccount["id"];
}

export interface SelectTransferMethods_V2Ref {
  selectionOfTransferMethods: Array<string>;
}

const SelectTransferMethods_V2 = forwardRef<SelectTransferMethods_V2Ref, SelectTransferMethods_V2Props>(({ bank_id }, ref) => {
  const theme = useTheme();

  const [available_transfer_methods, set_available_transfer_methods] = useState<Array<{ id: number, method: string }>>([]);
  const [selectionOfTransferMethods, setSelectionOfTransferMethods] = useState<Array<string>>([]);

  useImperativeHandle(ref, () => {
    return { selectionOfTransferMethods };
  }, [selectionOfTransferMethods]);

  useEffect(() => {
    TransferMethodApi.list_all()
      .then(tms => {
        if (tms === undefined) {
          Alert.alert("Erro ocorreu ao carregar os métodos de pagamento!", "Não foi possível carregar os métodos de pagamento.")
          return;
        }

        set_available_transfer_methods(tms.map((tm) => {
          const { id, method } = tm.properties
          return { id, method }
        }))
      })
      .catch(error => {
        Alert.alert("Erro Crítico!", "Aconteceu algum erro no processamento de 'TransferMethodApi.list_all()'")
      })
  }, [])

  // Só será executado caso bank_id for passado
  useEffect(() => {
    if(bank_id === undefined){
      return;
    }
    BankAccountApi.list_all_transfers_methods_type({ id: bank_id! }).then((transfer_methods) => {
      if (transfer_methods === undefined) {
        Alert.alert("Erro ocorreu ao carregar os métodos de pagamento!", "Não foi possível carregar os métodos de pagamento.")
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
        mode="modal"
        style={[
          styles.dropdown,
          { backgroundColor: theme.colors.elevation.level5 }
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: theme.colors.onSurface }
        ]}
        data={available_transfer_methods}
        labelField="method"
        valueField="method"
        placeholder="Escolha os métodos de transferência"
        value={selectionOfTransferMethods}
        onChange={(selection, ...rest) => {
          setSelectionOfTransferMethods(selection)
        }}
        renderItem={(item, selected) => {
          return (
            <View
              style={[
                styles.renderItem,
                { backgroundColor: !selected ? theme.colors.elevation.level5 : theme.colors.inversePrimary }
              ]}
            >
              <Text
                style={[
                  styles.renderItemText,
                  { color: theme.colors.onSurface }
                ]}
              >{item.method}</Text>
            </View>
          )
        }}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View
              style={[
                styles.selectedStyle,
                { backgroundColor: theme.colors.inversePrimary }
              ]}
            >
              <Text style={styles.textSelectedStyle}>{item.method}</Text>
              <MCIcons color={theme.colors.onSurface} name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
);

export default SelectTransferMethods_V2;
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
  dropdown: {
    height: 50,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  renderItem: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderItemText: {

  },
  selectedStyle: {
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
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
})