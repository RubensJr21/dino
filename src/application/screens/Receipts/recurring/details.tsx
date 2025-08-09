import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringPaymentApi from "@src/application/api/payment/recurring.api";
import RecurringDetailsScreenTemplate from "@src/application/templates/screens/Recurring/Details";
import { RecurringDetailsProvider } from "@src/application/templates/screens/Recurring/Details/context";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { ReceiptsRecurringStackParamList } from "./routes";

type DetailsRecurringProps = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Details'>;

export default function DetailsRecurring({ route, navigation }: DetailsRecurringProps) {
  const getRecurrings = async (recurring_id: Recurring["id"]): Promise<ItemValue[] | undefined> => {
    return RecurringPaymentApi.list_all_items({ recurring_id })
  }

  return (
    <RecurringDetailsProvider>
      <RecurringDetailsScreenTemplate
        recurring_id={route.params.recurring_id}
        getRecurrings={getRecurrings}
      />
    </RecurringDetailsProvider>
  );
}