import {
  createComponentInputText,
  InputTextGenericRefProps,
  InputTextGenericRefTypeRef,
  useRefInputGenericRef,
} from "../../../../components/Input/InputTextGenericRef";

export interface InputBankAgencyTypeRef extends InputTextGenericRefTypeRef {}

export interface InputBankAgencyProps extends InputTextGenericRefProps {}

export function useRefInputBankAgency() {
	return useRefInputGenericRef<InputBankAgencyTypeRef>();
}

export default createComponentInputText<
	InputBankAgencyTypeRef,
	InputBankAgencyProps
>();
