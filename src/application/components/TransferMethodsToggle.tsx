import { TransferMethods } from "@src/core/shared/types/transfer_methods";
import Toggle, { ToggleRef, useRefToggle } from "./Toggle";

export function createTogglesRef() {
  const obj = {} as Record<TransferMethods, React.RefObject<ToggleRef>>;
  for (const method of Object.values(TransferMethods)) {
    obj[method] = useRefToggle();
  }
  return obj;
}

interface TransferMethodsTogglesProps {
  data: Record<TransferMethods, React.RefObject<ToggleRef>>
  initialValues?: Partial<Record<TransferMethods, boolean>>
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
            value={initialValues?.[key as TransferMethods] ?? true}
            ref={value}
          />
        )
      }
    )
  }
</>)