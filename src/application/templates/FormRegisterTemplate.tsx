import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import InputDatePicker, { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import InputDescription, { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { ITag } from "@src/core/entities/tag.entity";
import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import { TypeOfVariants, VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import TagDropdown, { useRefTagDropdown } from "../components/TagDropdown";
import { TransferMethodDropdown } from "../components/TransferMethodDropdown";
import { useRefTransferMethodDropdown } from "../components/TransferMethodDropdown/TransferMethodDropdown";

export interface ValueFormRegisterTemplate {
  description: string;
  cashflow_type: TypeOfVariants;
  scheduled_at: Date;
  amount: number;
  was_processed: boolean;
  transfer_method_id: ITransferMethod["id"];
  tag_description: ITag["description"];
}

interface FormRegisterTemplateProps {
  variant: TypeOfVariants;
  formExtension?: ReactNode;
  submitAction: (params: ValueFormRegisterTemplate) => void;
}

export function getVariantText(variant: TypeOfVariants) {
  return variant === VARIANTS_OF_ITEM_VALUE.Receipt ? "recebimento" : "pagamento"
}

export default function FormRegisterTemplate({ variant, submitAction, formExtension }: FormRegisterTemplateProps) {
  // ATTENTION: Talvez o interessante seria buscar quais contas estão habilitadas aqui

  // 1️⃣ Declarar tudo aqui fora:
  const refDescription = useRefInputDescription();
  const refDatePicker = useRefInputDatePicker();
  const refCurrency = useRefInputCurrency();
  const refTagDropdown = useRefTagDropdown("others");
  const refTransferMethodDropdown = useRefTransferMethodDropdown()

  const handleAction = () => {
    submitAction({
      description: refDescription.value.current,
      scheduled_at: refDatePicker.dateRef.current,
      amount: refCurrency.currencyRef.current,
      transfer_method_id: refTransferMethodDropdown.selected.current,
      tag_description: refTagDropdown.selected.current,
      cashflow_type: variant,
      was_processed: false
    })
  }

  const variant_text = getVariantText(variant)

  const placeholderDescription = `${variant === VARIANTS_OF_ITEM_VALUE.Receipt ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${variant_text}:`
  const labelCurrency = `Valor do ${variant_text}:`
  const labelTag = `Selecione uma categoria para o ${variant_text}`
  const titleTransferMethod = `Selecione um método de ${variant_text}`

  return (
    <BasePageView>
      <BasePageTitle style={styles.title_page}>
        Registrar {getVariantText(variant)}
      </BasePageTitle>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll_view_container} keyboardShouldPersistTaps="handled">

          <View style={styles.view_form}>
            <InputDescription placeholder={placeholderDescription} {...{ refDescription }} />
            <InputDatePicker label={labelDate} {...{ refDatePicker }} />
            <InputCurrency label={labelCurrency} {...{ refCurrency }} />

            {formExtension}
            <TagDropdown label={labelTag} {...{refTagDropdown}} />
            <TransferMethodDropdown title={titleTransferMethod} {...{ refTransferMethodDropdown }} />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <SubmitButton variant="Add" onPress={handleAction} />
    </BasePageView>
  )
}

const styles = StyleSheet.create({
  title_page: {
    marginBottom: 0
  },
  scroll_view_container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  view_form: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
});