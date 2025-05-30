import {
	createComponentInputText,
	InputTextGenericRefProps,
	InputTextGenericRefTypeRef,
	useRefInputGenericRef,
} from "./InputTextGenericRef";

export interface InputCreditCardNameTypeRef
	extends InputTextGenericRefTypeRef {}

export interface InputCreditCardNameProps extends InputTextGenericRefProps {}

export function useRefInputCreditCardName() {
	return useRefInputGenericRef<InputCreditCardNameTypeRef>();
}

export default createComponentInputText<
	InputCreditCardNameTypeRef,
	InputCreditCardNameProps
>();
