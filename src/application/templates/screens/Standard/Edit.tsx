import { EditStandardScreenParams } from "@src/application/types/screens/StandardScreenParams";
import { TypeOfVariants } from "@src/core/shared/types/variants_items";
import FormTemplate from "../../FormTemplate";

interface StandardEditScreenTemplateProps {
  variant: TypeOfVariants;
  value: EditStandardScreenParams
  submitAction: (params: EditStandardScreenParams) => void
}

export default function StandardEditScreenTemplate({ variant, value, submitAction }: StandardEditScreenTemplateProps) {
  const handleAction = (standard: EditStandardScreenParams) => {
    submitAction(standard)
  }

  return (
    <FormTemplate
      {...{ variant }}
      value={value}
      submitAction={handleAction}
    />
  );
}