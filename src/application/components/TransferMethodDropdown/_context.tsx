import { useNavigation } from "@react-navigation/native";
import BankAccountApi from "@src/application/api/bank-account.api";
import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import { transfer_methods_available, TypeOfTransferMethods } from "@src/core/start_configs";
import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { Option } from "../DropdownSearchable";

// Valor padrão. OBS: NÃO É UM ID VALIDO
export const BANK_ACCOUNT_DEFAULT_VALUE = {
  label: "",
  value: -1
} as const satisfies Option<IBankAccount["id"]>

// Valor padrão. OBS: NÃO É UM ID VALIDO
export const TRANSFER_METHOD_DEFAULT_VALUE = {
  label: "",
  value: -1
} as const satisfies Option<ITransferMethod["id"]>

type TransferMethodPickerContextType = {
  readonly isLoading: boolean;
  readonly banks: Option<IBankAccount["id"]>[];
  readonly transfer_methods: Option<ITransferMethod["id"]>[];
  readonly bankAccountSelected: Option<IBankAccount["id"]>;
  readonly change_bank_account: (new_bank_account: Option<IBankAccount["id"]>) => Promise<void>
  readonly transferMethodSelected: Option<ITransferMethod["id"]>;
  readonly change_transfer_method: (new_transfer_method: Option<ITransferMethod["id"]>) => Promise<void>
};

const TransferMethodPickerContext = createContext<TransferMethodPickerContextType | undefined>(undefined)

function mapper_bank_dropdown_item(bank: BankAccount): Option<IBankAccount["id"]> {
  const { id: value, nickname: label } = bank
  return { label, value }
}

function mapper_transfer_method_dropdown_item(bank: BankAccountTransferMethod): Option<ITransferMethod["id"]> {
  const {
    id: value,
    transfer_method: {
      method
    }
  } = bank
  return { value, label: transfer_methods_available[method as TypeOfTransferMethods] }
}

interface TransferMethodPickerProviderProps {
  children: ReactNode;
}

export function TransferMethodPickerProvider({
  children
}: TransferMethodPickerProviderProps) {
  const navigation = useNavigation()
  const [isLoading, setLoading] = useState<boolean>(true);

  const [banks, setBanks] = useState<Option<IBankAccount["id"]>[]>([])
  const [transfer_methods, setTransferMethods] = useState<Option<ITransferMethod["id"]>[]>([])
  const [bankAccountSelected, setBankAccountSelected] = useState<Option<IBankAccount["id"]>>(BANK_ACCOUNT_DEFAULT_VALUE);
  const [transferMethodSelected, setTransferMethod] = useState<Option<ITransferMethod["id"]>>(TRANSFER_METHOD_DEFAULT_VALUE);

  // Receber uma lista de bancos e seus ids
  useLayoutEffect(() => {
    setLoading(true);
    BankAccountApi.list_all().then((banks) => {
      if (banks === undefined) {
        Alert.alert(
          "Erro ocorreu ao carregar os bancos!",
          "Não foi possível carregar os bancos."
        )
        setLoading(false);
        return;
      }
      if (banks.length === 0) {
        Alert.alert("Atenção!", "É necessário ter, pelo menos, um banco cadastrado!")
        navigation.goBack()
        return;
      }
      const bank_dropdown_items = banks.map(mapper_bank_dropdown_item)
      setBanks(bank_dropdown_items)
      setBankAccountSelected(bank_dropdown_items[0])
    })
  }, [])

  // Executa imediatamente depois do setBankAccountSelected
  useEffect(() => {
    if (bankAccountSelected.value === -1) {
      return;
    }
    BankAccountApi.list_all_transfers_methods_type({ id: bankAccountSelected.value })
      .then(transfer_methods => {
        if (transfer_methods === undefined) {
          Alert.alert(
            "'TransferMethodPicker/_context.tsx' diz:",
            "Não foi possível carregar os métodos de pagamento."
          )
          navigation.goBack()
          return;
        }
        setTransferMethods(
          transfer_methods.map(mapper_transfer_method_dropdown_item)
        )
      }).catch(e => {
        console.error("Linha 105. Arquivo _context", e)
      })
  }, [bankAccountSelected])

  // Executa imediatamente depois do setTransferMethods
  useEffect(() => {
    if (transfer_methods.length === 0) return;
    setTransferMethod(transfer_methods[0]);
    setLoading(false);
  }, [transfer_methods])

  const change_bank_account = async (new_bank_account: Option<IBankAccount["id"]>): Promise<void> => {
    if (!banks.find(bank_item => bank_item.value === new_bank_account.value)) {
      Alert.alert("O id para a conta bancária é inválido!")
      return;
    }
    // Pois irá atualizar os transfer_methods
    setLoading(true);
    setBankAccountSelected(new_bank_account);
  }

  const change_transfer_method = async (new_transfer_method: Option<ITransferMethod["id"]>): Promise<void> => {
    if (!transfer_methods.find(transfer_method_item => transfer_method_item.value === new_transfer_method.value)) {
      // console.info({ transfer_methods, new_transfer_method })
      Alert.alert("O id para o método de transferência é inválido!")
      return;
    }
    setTransferMethod(new_transfer_method);
  }

  return (
    <TransferMethodPickerContext.Provider
      value={{
        isLoading,
        banks,
        transfer_methods,
        bankAccountSelected,
        transferMethodSelected,
        change_bank_account,
        change_transfer_method,
      }}
    >
      {children}
    </TransferMethodPickerContext.Provider>
  )
}

export function useTransferMethodPicker() {
  const context = useContext(TransferMethodPickerContext)
  if (context === undefined) {
    throw new Error('useBankAccount must be used within a TransferMethodPickerProvider');
  }

  const {
    isLoading,
    bankAccountSelected,
    transferMethodSelected
  } = context

  return {
    isLoading,
    bankAccountSelected,
    transferMethodSelected
  }
}

export function useBankAccounts() {
  const context = useContext(TransferMethodPickerContext)
  if (context === undefined) {
    throw new Error('useBankAccount must be used within a TransferMethodPickerProvider');
  }

  const {
    banks,
    bankAccountSelected,
    change_bank_account
  } = context

  return {
    items: banks,
    choose: bankAccountSelected,
    change_bank_account
  };
}

export function useTransferMethods() {
  const context = useContext(TransferMethodPickerContext)
  if (context === undefined) {
    throw new Error('useTransferMethod must be used within a TransferMethodPickerProvider');
  }

  const {
    transfer_methods,
    transferMethodSelected,
    change_transfer_method
  } = context

  return {
    items: transfer_methods,
    choose: transferMethodSelected,
    change_transfer_method,
  };
}