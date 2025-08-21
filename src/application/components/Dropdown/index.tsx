import { createContextDropdown, Option } from "./_context";
import { ListDropdown } from "./_List";
import { DropdownIndex } from "./Dropdown";

export { Option };

interface Props<T> {
  label: React.ComponentProps<typeof DropdownIndex>["label"];
  options: Option<T>[];
  onSelect: (selected: Option<T>) => void;
  renderItem: React.ComponentProps<typeof ListDropdown>["renderItem"];
  choose?: Option<T>;
}

export function Dropdown<T>({
  label,
  options,
  onSelect,
  renderItem,
  choose,
}: Props<T>) {
  const {
    DropdownProvider,
    useDropdownContext
  } = createContextDropdown<T>(options, onSelect, choose)

  return (
    <DropdownProvider>
      <DropdownIndex {...{ getContext: useDropdownContext, label, renderItem }} />
    </DropdownProvider>
  )
}