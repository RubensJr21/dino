import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import { DropdownTypeRef } from "../Dropdown/_context";
import { TransferMethodPickerProvider } from "./_context";
import { TransferMethodDropdownIndex } from "./TransferMethodDropdown";

interface Props {
  title: string;
  refTransferMethodDropdown: DropdownTypeRef<ITransferMethod["id"]>;
}

export function TransferMethodDropdown({
  title,
  refTransferMethodDropdown
}: Props) {
  return (
    <TransferMethodPickerProvider>
      <TransferMethodDropdownIndex {...{title, refTransferMethodDropdown}}/>
    </TransferMethodPickerProvider>
  )
}