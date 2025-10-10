import BasePage from "@components/ui/base/BasePage";
import { list_all_item_value_installments } from "@data/playground/installment/list_all_item_value";
import { ItemValueEntity } from "@lib/types";
import { ComponentProps, useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";
import { Items } from "../Items";
import { TransactionInstallmentCardViewer } from "./Card";

interface InstallmentViewerBaseProps {
  id: number;
  dataCard: ComponentProps<typeof TransactionInstallmentCardViewer>["data"]
}

interface InstallmentsState {
  processed: ItemValueEntity[];
  unprocessed: ItemValueEntity[];
}

export function InstallmentViewerBase({
  id,
  dataCard
}: InstallmentViewerBaseProps) {
  const theme = useTheme()
  const [installments, setInstallments] = useState<InstallmentsState>({ processed: [], unprocessed: [] })
  const [processedExpanded, setProcessedExpanded] = useState(false)
  const [unprocessedExpanded, setUnprocessedExpanded] = useState(false)

  const handlePressProcessed = () => setProcessedExpanded(expanded => !expanded);
  const handlePressUnprocessed = () => setUnprocessedExpanded(expanded => !expanded);

  const isUnloaded = useMemo(() => {
    return installments.processed.length === 0 && installments.unprocessed.length === 0
  }, [installments])

  useEffect(() => {
    list_all_item_value_installments(id)
      .then(items_value => {
        setInstallments({
          processed: items_value.filter((item_value) => item_value.was_processed),
          unprocessed: items_value.filter((item_value) => !item_value.was_processed)
        })
      })
  }, [id])

  if (isUnloaded) {
    return null;
  }

  return (
    <BasePage>
      <TransactionInstallmentCardViewer data={dataCard} />
      <ScrollView>
        <List.Section>
          <List.Accordion
            title="Não Concluídos"
            left={props => <List.Icon {...props} icon="clock" />}
            expanded={unprocessedExpanded}
            onPress={handlePressUnprocessed}
          >
            <Items data={installments.unprocessed} labelButton="Efetivar" colorButton={theme.colors.onPrimary} />
          </List.Accordion>

          <List.Accordion
            title="Concluídos"
            left={({ color, ...props }) => <List.Icon {...props} icon="check" />}
            expanded={processedExpanded}
            onPress={handlePressProcessed}
          >
            <Items data={installments.processed} labelButton="Reverter" colorButton={theme.colors.onTertiary} />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </BasePage>
  )
}