import BasePage from "@components/ui/base/BasePage";
import ScrollView from "@components/ui/base/ScrollView";
import { list_all_item_value_recurrings } from "@data/playground/recurring/list_all_item_value";
import { ItemValueEntity } from "@lib/types";
import { ComponentProps, useEffect, useMemo, useState } from "react";
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
  const [recurrings, setRecurrings] = useState<RecurringsState>({ processed: [], unprocessed: [] })
  const [processedExpanded, setProcessedExpanded] = useState(false)
  const [unprocessedExpanded, setUnprocessedExpanded] = useState(false)

  const handlePressProcessed = () => setProcessedExpanded(expanded => !expanded);
  const handlePressUnprocessed = () => setUnprocessedExpanded(expanded => !expanded);

  const isUnloaded = useMemo(() => {
    return recurrings.processed.length === 0 && recurrings.unprocessed.length === 0
  }, [recurrings])

  useEffect(() => {
    list_all_item_value_recurrings(id)
      .then(items_value => {
        setRecurrings({
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
      <TransactionRecurringCardViewer data={dataCard} />
      <ScrollView>
        <List.Section>
          <List.Accordion
            title="Não Concluídos"
            left={props => <List.Icon {...props} icon="clock" />}
            expanded={unprocessedExpanded}
            onPress={handlePressUnprocessed}
          >
            <Items data={recurrings.unprocessed} labelButton="Efetivar" colorButton={theme.colors.onPrimary} />
          </List.Accordion>

          <List.Accordion
            title="Concluídos"
            left={({ color, ...props }) => <List.Icon {...props} icon="check" />}
            expanded={processedExpanded}
            onPress={handlePressProcessed}
          >
            <Items data={recurrings.processed} labelButton="Reverter" colorButton={theme.colors.onTertiary} />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </BasePage>
  )
}