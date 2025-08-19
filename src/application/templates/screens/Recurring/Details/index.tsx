import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { useEffect } from "react";
import { useRecurringProcessedDetails, useRecurringScheduledDetails } from "./context";
import { ProcessedTabRoutes } from "./ProcessedTabRoutes";

interface DetailsRecurringScreenTemplateProps {
  recurring_id: Recurring["id"];
  getRecurrings: (recurring_id: Recurring["id"]) => Promise<ItemValue[] | undefined>;
}

export default function RecurringDetailsScreenTemplate({ recurring_id, getRecurrings }: DetailsRecurringScreenTemplateProps) {
  const { addItems: addItemsProcessed } = useRecurringProcessedDetails()
  const { addItems: addItemsScheduled } = useRecurringScheduledDetails()

  useEffect(() => {
    getRecurrings(recurring_id).then((itemValues) => {
      if (itemValues) {
        for (const item of itemValues) {
          if (!item.was_processed) {
            addItemsScheduled(item);
          } else {
            addItemsProcessed(item);
          }
        }
      }
    }).catch((error) => {
      console.error("Error fetching recurring items:", error);
    })
  }, [recurring_id]);

  return <ProcessedTabRoutes />;
}