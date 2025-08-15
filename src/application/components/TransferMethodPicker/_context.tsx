import { useNavigation } from "@react-navigation/native";
import BankAccountApi from "@src/application/api/bank-account.api";
import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type TransferMethodPickerContextType = {
  isLoading: boolean;
  banks: BankPickerItem[];
  transfer_methods: TransferMethodItem[];
  bankAccountId: number;
  transferMethodId: number;
  change_bank_account_id: (new_id: number) => Promise<void>
  change_transfer_method_id: (new_id: number) => Promise<void>
  reset_bank_account_id: () => Promise<void>
  reset_transfer_method_id: () => Promise<void>
};

const TransferMethodPickerContext = createContext<TransferMethodPickerContextType | undefined>(undefined)

interface TransferMethodPickerProviderProps {
  children: ReactNode;
}

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

interface TransferMethodItem {
  id: number;
  label: ITransferMethod["method"];
}

function mapper_transfer_method_picker_item(bank: BankAccountTransferMethod): TransferMethodItem {
  const {
    id,
    transfer_method: {
      method: label
    }
  } = bank
  return {
    id,
    label
  }
}

export function TransferMethodPickerProvider({
  children
}: TransferMethodPickerProviderProps) {
  const navigation = useNavigation()
  const [isLoading, setLoading] = useState<boolean>(true);

  const [banks, setBanks] = useState<BankPickerItem[]>([])
  const [transfer_methods, setTransferMethods] = useState<TransferMethodItem[]>([])

  // Receber uma lista de bancos e seus ids
  useEffect(() => {
    BankAccountApi.list_all().then((banks) => {
      if (banks === undefined) {
        Alert.alert("Erro ocorreu ao carregar os bancos!", "Não foi possível carregar os bancos.")
        return;
      }
      if (banks.length === 0) {
        Alert.alert("É necessário cadastrar pelo menos um banco primeiro!")
        navigation.goBack()
        return;
      }
      setBanks(banks.map(mapper_bank_picker_item))
    })
  })

  const [bankAccountId, setBankAccountId] = useState<number>(-1);
  const [transferMethodId, setTransferMethodId] = useState<number>(-1);

  const change_bank_account_id = async (new_id: number): Promise<void> => {
    if (!banks.find(bank_item => bank_item.id === new_id)) {
      Alert.alert("O id para a conta bancária é inválido!")
      return;
    }
    setBankAccountId(new_id);
    setTransferMethodId(0);
    setLoading(true);
    try {
      const transfer_methods = await BankAccountApi.list_all_transfers_methods_type({ id: new_id })
      
      if (transfer_methods === undefined) {
        Alert.alert("Erro ocorreu ao carregar os métodos de pagamento!", "Não foi possível carregar os métodos de pagamento.")
        return;
      }
      
      setTransferMethods((prev) => {
        setTransferMethodId(0);
        setLoading(false);
        return transfer_methods.map(mapper_transfer_method_picker_item)
      })
    } catch (e) {
      console.error("Linha 105. Arquivo _context", e)
    }
  }

  const change_transfer_method_id = async (new_id: number): Promise<void> => {
    if (!transfer_methods.find(transfer_method_item => transfer_method_item.id === new_id)) {
      Alert.alert("O id para o método de transferência é inválido!")
      return;
    }
    setTransferMethodId(new_id);
  }

  const reset_bank_account_id = async (): Promise<void> => {
    setBankAccountId(0);
    reset_transfer_method_id();
  }

  const reset_transfer_method_id = async (): Promise<void> => {
    setTransferMethodId(0);
  }

  return (
    <TransferMethodPickerContext.Provider
      value={{
        isLoading,
        banks,
        transfer_methods,
        bankAccountId,
        transferMethodId,
        change_bank_account_id,
        change_transfer_method_id,
        reset_bank_account_id,
        reset_transfer_method_id
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
    bankAccountId,
    transferMethodId
  } = context

  return {
    isLoading,
    bankAccountId,
    transferMethodId
  }
}

export function useBankAccounts() {
  const context = useContext(TransferMethodPickerContext)
  if (context === undefined) {
    throw new Error('useBankAccount must be used within a TransferMethodPickerProvider');
  }

  const {
    banks,
    bankAccountId,
    change_bank_account_id,
    reset_bank_account_id
  } = context

  return {
    items: banks,
    choose: bankAccountId,
    select_bank: change_bank_account_id,
    reset: reset_bank_account_id
  };
}

export function useTransferMethods() {
  const context = useContext(TransferMethodPickerContext)
  if (context === undefined) {
    throw new Error('useTransferMethod must be used within a TransferMethodPickerProvider');
  }

  const {
    transfer_methods,
    transferMethodId,
    change_transfer_method_id,
    reset_transfer_method_id
  } = context

  return {
    items: transfer_methods,
    choose: transferMethodId,
    select_transfer_method: change_transfer_method_id,
    reset: reset_transfer_method_id
  };
}