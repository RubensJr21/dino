import { createContextDropdownSearchable, Option } from "./_context";
import { ListDropdownSearchable } from "./_List";
import { DropdownSearchableIndex } from "./DropdownSearchable";

export { Option };

interface Props<T> {
  label: string;
  options: Option<T>[];
  onSelect: (selected: Option<T>) => void;
  renderItem: React.ComponentProps<typeof ListDropdownSearchable>["renderItem"];
  choose?: Option<T>;
}

export function DropdownSearchable<T>({
  label,
  options,
  onSelect,
  renderItem,
  choose,
}: Props<T>) {

  const {
    DropdownSearchableProvider,
    useDropdownSearchableContext
  } = createContextDropdownSearchable<T>(options, onSelect, choose)

  return (
    <DropdownSearchableProvider>
      <DropdownSearchableIndex
        getContext={useDropdownSearchableContext}
        label={label}
        renderItem={renderItem}
      />
    </DropdownSearchableProvider>
  )
}