import TransferMethodApi from "@src/application/api/transfer-method.api";
import { MdiIcons } from "@src/application/components/ChooseIcon";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { Text, useTheme } from "react-native-paper";

export interface SelectTransferMethodsTypeRef {
  transfer_methods_selected: React.MutableRefObject<Array<string>>;
  changeTransferMethods: (list: Array<string>) => void;
}

export function useRefSelectTransferMethods(initialValue: Array<string> = []): SelectTransferMethodsTypeRef {
  const ref = useRef<Array<string>>(initialValue)
  const changeTransferMethods = (list: Array<string>) => ref.current = list;
  return {
    transfer_methods_selected: ref,
    changeTransferMethods,
  };
}

interface SelectTransferMethodsProps {
  refSelectTransferMethods: SelectTransferMethodsTypeRef;
}

export function SelectTransferMethods({ refSelectTransferMethods }: SelectTransferMethodsProps) {
  const theme = useTheme();

  const [available_transfer_methods, set_available_transfer_methods] = useState<Array<{ id: number, method: string }>>([]);
  const [selectedTransferMethods, setSelectedTransferMethods] = useState<Array<string>>([]);

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

  if (available_transfer_methods.length === 0) {
    // Alert.alert("Não existem métodos de transferências disponíveis ainda...")
    return null;
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
        value={selectedTransferMethods}
        onChange={(selected, ...rest) => {
          setSelectedTransferMethods((prev) => {
            refSelectTransferMethods.changeTransferMethods(selected)
            return selected
          })
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
              <MdiIcons color={theme.colors.onSurface} name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

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