import {
	createComponentInputText,
	InputTextGenericRefProps,
	InputTextGenericRefTypeRef,
	useRefInputGenericRef,
} from "./InputTextGenericRef";

export interface InputBankAccountTypeRef extends InputTextGenericRefTypeRef {}

export interface InputBankAccountProps extends InputTextGenericRefProps {}

export function useRefInputBankAccount() {
	return useRefInputGenericRef<InputBankAccountTypeRef>();
}

export default createComponentInputText<
	InputBankAccountTypeRef,
	InputBankAccountProps
>();
