import BasePage from "@components/ui/base/BasePage";
import ScrollView from "@components/ui/base/ScrollView";
import { ItemValueEntity } from "@lib/types";
import { ComponentProps, useEffect, useState } from "react";
import { List, useTheme } from "react-native-paper";
import { Items } from "../Items";
import { TransactionRecurringCardViewer } from "./Card";

interface RecurringViewerBaseProps {
  id: number;
  dataCard: ComponentProps<typeof TransactionRecurringCardViewer>["data"]
}

interface RecurringsState {
  processed: ItemValueEntity[];
  unprocessed: ItemValueEntity[];
}

export function RecurringViewerBase({
  id,
  dataCard
}: RecurringViewerBaseProps) {
  const theme = useTheme()
  const [installments, setRecurrings] = useState<RecurringsState>({ processed: [], unprocessed: [] })
  const [processedExpanded, setProcessedExpanded] = useState(false)
  const [unprocessedExpanded, setUnprocessedExpanded] = useState(false)

  const handlePressProcessed = () => setProcessedExpanded(expanded => !expanded);
  const handlePressUnprocessed = () => setUnprocessedExpanded(expanded => !expanded);

  // Buscar baseado no ID
  useEffect(() => {
    const itemValueArray = new Array<ItemValueEntity>()
    setRecurrings({
      processed: itemValueArray.filter((item_value) => item_value.was_processed),
      unprocessed: itemValueArray.filter((item_value) => !item_value.was_processed)
    })
  }, [id])

  // Ainda não carregou
  if (installments.processed.length === 0 && installments.unprocessed.length === 0) {
    return null;
  }

  return (
    <BasePage>
      <TransactionRecurringCardViewer data={dataCard} />
      <ScrollView>
        <List.Section>
          <List.Accordion
            title="Não Concluídos"
            left={props => <List.Icon {...props} icon="clock" />}
            expanded={processedExpanded}
            onPress={handlePressProcessed}
          >
            <Items data={installments.processed} labelButton="Efetivar" colorButton={theme.colors.onPrimary} />
          </List.Accordion>

          <List.Accordion
            title="Concluídos"
            left={({ color, ...props }) => <List.Icon {...props} icon="check" />}
            expanded={unprocessedExpanded}
            onPress={handlePressUnprocessed}
          >
            <Items data={installments.unprocessed} labelButton="Reverter" colorButton={theme.colors.onTertiary} />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </BasePage>
  )
}