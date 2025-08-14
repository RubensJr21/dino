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
import { TextBold } from "../components/Text/TextBold";
import { TransferMethodPicker } from "../components/TransferMethodPicker";

export interface ValueFormEditTemplate {
  id: number;
  description: string;
  cashflow_type: TypeOfVariants;
  scheduled_at: Date;
  amount: number;
  was_processed: boolean;
  transfer_method_id: ITransferMethod["id"];
  tag_description: ITag["description"];
}

interface FormEditTemplateProps {
  variant: TypeOfVariants;
  value: ValueFormEditTemplate;
  formExtension?: ReactNode;
  submitAction: (params: ValueFormEditTemplate) => void;
}

export function getVariantText(variant: TypeOfVariants) {
  return variant === VARIANTS_OF_ITEM_VALUE.Receipt ? "recebimento" : "pagamento"
}

export default function FormEditTemplate({ variant, value, submitAction, formExtension }: FormEditTemplateProps) {
  // 1️⃣ Declarar tudo aqui fora:
  const refDescription = useRefInputDescription(value.description);
  const refDatePicker = useRefInputDatePicker(value.scheduled_at);
  const refCurrency = useRefInputCurrency(value.amount);
  const refTagPicker = useRefTagPicker(value.tag_description);

  const handleAction = () => {
    submitAction({
      id: value.id,
      description: refDescription.value.current,
      scheduled_at: refDatePicker.dateRef.current,
      amount: refCurrency.currencyRef.current,
      // ALERT: Preciso criar o seletor de método de transferência
      transfer_method_id: 1,
      tag_description: refTagPicker.value.current,
      cashflow_type: variant,
      was_processed: false
    })
  };

  const variant_text = variant === VARIANTS_OF_ITEM_VALUE.Receipt ? "recebimento" : "pagamento"

  const placeholderDescription = `${variant === VARIANTS_OF_ITEM_VALUE.Receipt ? "De onde veio" : "Para onde vai"} esse valor?`;
  const labelDate = `Selecione a data do ${variant_text}:`
  const labelCurrency = `Valor do ${variant_text}:`
  const labelTag = `Selecione uma categoria para o ${variant_text}`

  return (
    <BasePageView>
      <BasePageTitle style={styles.title_page}>
        Edição de {getVariantText(variant)} - ({value.id}) <TextBold children={value.description} />
      </BasePageTitle>
      <ScrollView contentContainerStyle={styles.scroll_view_container}>
        <View style={styles.view_form}>
          <InputDescription placeholder={placeholderDescription} {...{ refDescription }} />
          <InputDatePicker label={labelDate} {...{ refDatePicker }} />
          <InputCurrency label={labelCurrency} {...{ refCurrency }} />

          {formExtension}

          <TagPicker label={labelTag} {...{ refTagPicker }} />

          <TransferMethodPicker />

        </View>
      </ScrollView>
      <SubmitButton variant="Edit" onPress={handleAction} />
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