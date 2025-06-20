import {
  createComponentInputText,
  InputTextGenericRefProps,
  InputTextGenericRefTypeRef,
  useRefInputGenericRef,
} from "../../../../components/Input/InputTextGenericRef";

export interface InputBankNameTypeRef extends InputTextGenericRefTypeRef {}

export interface InputBankNameProps extends InputTextGenericRefProps {}

export function useRefInputBankName() {
	return useRefInputGenericRef<InputBankNameTypeRef>();
}

export default createComponentInputText<
	InputBankNameTypeRef,
	InputBankNameProps
>();
