import SelectedDateButton from "@components/ui/SelectDateButton";

interface Props {
  date: Date,
  onDateConfirm: (date: Date) => void
}

export function DatePicker({ date, onDateConfirm }: Props) {
  return (
    <SelectedDateButton
      label="Selecionar data"
      selectedLabel="Mudar data"
      date={date}
      onDateConfirm={onDateConfirm}
    />
  )
}