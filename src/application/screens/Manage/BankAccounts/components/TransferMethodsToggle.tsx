import { TransferMethodsAvailable, TypeOfTransferMethods } from "@src/core/shared/types/transfer_methods";
import Toggle, { ToggleRef, useRefToggle } from "../../../../components/Toggle";

export function createTogglesRef() {
  const obj = {} as Record<TypeOfTransferMethods, React.RefObject<ToggleRef>>;
  for (const method of Object.keys(TransferMethodsAvailable).map(key => key as TypeOfTransferMethods)) {
    obj[method] = useRefToggle();
  }
  return obj;
}

interface TransferMethodsTogglesProps {
  data: Record<TypeOfTransferMethods, React.RefObject<ToggleRef>>
  initialValues?: Partial<Record<TypeOfTransferMethods, boolean>>
}

export const TransferMethodsToggles = ({data, initialValues}: TransferMethodsTogglesProps) =>
(<>
  {
    Object.entries(data)
      .map(([key, value]) => {
        return (
          <Toggle
            key={key}
            label={key}
            value={initialValues?.[key as TypeOfTransferMethods] ?? true}
            ref={value}
          />
        )
      }
    )
  }
</>)