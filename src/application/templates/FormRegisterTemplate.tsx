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
import { ScrollView, StyleSheet, View } from "react-native";
import TagPicker, { useRefTagPicker } from "../components/TagPicker";
import { TransferMethodPicker } from "../components/TransferMethodPicker";

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
  // 1️⃣ Declarar tudo aqui fora:
  const refDescription = useRefInputDescription();
  const refDatePicker = useRefInputDatePicker();
  const refCurrency = useRefInputCurrency();
  const refTagPicker = useRefTagPicker("others");

  const handleAction = () => {
    submitAction({
      description: refDescription.value.current,
      scheduled_at: refDatePicker.dateRef.current,
      amount: refCurrency.currencyRef.current,
      // ALERT: Preciso criar o seletor de método de transferência
      transfer_method_id: 1,
      tag_description: refTagPicker.value.current,
      cashflow_type: variant,
      was_processed: false
    })
  }

  const variant_text = getVariantText(variant)

  const placeholderDescription = `${variant === VARIANTS_OF_ITEM_VALUE.Receipt ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${variant_text}:`
  const labelCurrency = `Valor do ${variant_text}:`
  const labelTag = `Selecione uma categoria para o ${variant_text}`

  return (
    <BasePageView>
      <ScrollView>
        <BasePageTitle>
          <BasePageTitle>Registrar {getVariantText(variant)}</BasePageTitle>
        </BasePageTitle>
        <View style={styles.view_form}>
          <InputDescription placeholder={placeholderDescription} {...{ refDescription }} />
          <InputDatePicker label={labelDate} {...{ refDatePicker }} />
          <InputCurrency label={labelCurrency} {...{ refCurrency }} />

          {formExtension}

          <TagPicker label={labelTag} {...{ refTagPicker }} />

          <TransferMethodPicker />

          <SubmitButton variant="Add" onPress={handleAction} />
        </View>
      </ScrollView>
    </BasePageView>
  )
}

const styles = StyleSheet.create({
  view_form: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
});