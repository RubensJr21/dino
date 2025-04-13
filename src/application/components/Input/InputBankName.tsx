import {
	createComponentInputText,
	InputTextGenericRefProps,
	InputTextGenericRefTypeRef,
	useRefInputGenericRef,
} from "./InputTextGenericRef";

export interface InputBankNameTypeRef extends InputTextGenericRefTypeRef {}

export interface InputBankNameProps extends InputTextGenericRefProps {}

export function useRefInputBankName() {
	return useRefInputGenericRef<InputBankNameTypeRef>();
}

export default createComponentInputText<
	InputBankNameTypeRef,
	InputBankNameProps
>();
