import SelectedDateButton from "@components/ui/base/SelectDateButton";

interface Props {
  date: Date,
  onDateConfirm: (date: Date) => void,
  label?: string;
  selectedLabel?: string;
}

export function DatePicker({ date, onDateConfirm, label = "Selecionar data", selectedLabel = "Mudar data" }: Props) {
  return (
    <SelectedDateButton
      label={label}
      selectedLabel={selectedLabel}
      date={date}
      onDateConfirm={onDateConfirm}
    />
  )
}