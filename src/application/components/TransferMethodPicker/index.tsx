import { TransferMethodPickerProvider } from "./_context";
import { TransferMethodPickerIndex } from "./TransferMethodPicker";

export function TransferMethodPicker() {
  return (
    <TransferMethodPickerProvider>
      <TransferMethodPickerIndex />
    </TransferMethodPickerProvider>
  )
}