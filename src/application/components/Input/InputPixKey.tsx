import {
	createComponentInputText,
	InputTextGenericRefProps,
	InputTextGenericRefTypeRef,
	useRefInputGenericRef,
} from "./InputTextGenericRef";

export interface InputPixKeyTypeRef extends InputTextGenericRefTypeRef {}

export interface InputPixKeyProps extends InputTextGenericRefProps {}

export function useRefInputPixKey() {
	return useRefInputGenericRef<InputPixKeyTypeRef>();
}

export default createComponentInputText<InputPixKeyTypeRef, InputPixKeyProps>();
