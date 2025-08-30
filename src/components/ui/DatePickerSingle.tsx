import Button from "@components/ui/Button";
import { useCallback, useState } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { SingleChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";

interface Props {
  date?: Date;
  onDateConfirm: (date: Date) => void;
}

export default function DatePickerSingle({date: dateProp , onDateConfirm }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dateProp)

    const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback<SingleChange>(
    ({date}) => {
      setOpen(false);
      setDate(date);
      if(date === undefined) {
        return;
      }
      onDateConfirm(date)
    },
    [setOpen]
  );

  return (
    <>
      <Button onPress={() => setOpen(true)}>
        {
          date !== undefined ?
          `Data selecionada: ${date.toLocaleDateString()}` :
          "Selecione uma data"
        }
      </Button>
      <DatePickerModal
        locale="pt"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
    </>
  )
}