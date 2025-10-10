import BasePage from "@components/ui/base/BasePage";
import { list_all_item_value_recurrings } from "@data/playground/recurring/list_all_item_value";
import { mark_item_value_recurring_as_processed } from "@data/playground/recurring/mark_item_value_as_processed";
import { mark_item_value_recurring_as_unprocessed } from "@data/playground/recurring/mark_item_value_as_unprocessed";
import { CallToast } from "@lib/call-toast";
import { ItemValueEntity } from "@lib/types";
import { ComponentProps, useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
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

  const moveProcessedToUnprocessed = useCallback(async (item_value: ItemValueEntity) => {
    mark_item_value_recurring_as_processed(id, item_value.id)
      .then(() => {
        setRecurrings(prev => {
          return {
            processed: prev.processed.filter((iv) => iv.id !== item_value.id),
            unprocessed: [item_value, ...prev.unprocessed]
          }
        })
      })
      .catch(error => {
        console.error(error)
        CallToast("Ocorreu um erro ao marcar um item dessa transação parcelada como não processado!")
      })
  }, [setRecurrings])

  const moveUnprocessedToProcessed = useCallback(async (item_value: ItemValueEntity) => {
    mark_item_value_recurring_as_unprocessed(id, item_value.id)
      .then(() => {
        setRecurrings(prev => {
          return {
            unprocessed: prev.unprocessed.filter((iv) => iv.id !== item_value.id),
            processed: [item_value, ...prev.processed]
          }
        })
      })
      .catch(error => {
        console.error(error)
        CallToast("Ocorreu um erro ao marcar um item dessa transação parcelada como processado!")
      })
  }, [setRecurrings])

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
            <Items
              data={recurrings.unprocessed}
              labelButton="Efetivar"
              colorButton={theme.colors.onPrimary}
              changeStatus={moveUnprocessedToProcessed}
            />
          </List.Accordion>

          <List.Accordion
            title="Concluídos"
            left={({ color, ...props }) => <List.Icon {...props} icon="check" />}
            expanded={processedExpanded}
            onPress={handlePressProcessed}
          >
            <Items
              data={recurrings.processed}
              labelButton="Reverter"
              colorButton={theme.colors.onTertiary}
              changeStatus={moveProcessedToUnprocessed}
            />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </BasePage>
  )
}