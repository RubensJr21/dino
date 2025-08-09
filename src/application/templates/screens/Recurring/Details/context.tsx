import { ItemValue } from "@src/core/entities/item_value.entity";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type RecurringDetailsContextType = {
  items_processed: Set<ItemValue>;
  items_scheduled: Set<ItemValue>;
  add_items_processed: (item: ItemValue) => void;
  remove_items_processed: (item: ItemValue) => void;
  add_items_scheduled: (item: ItemValue) => void;
  remove_items_scheduled: (item: ItemValue) => void;
};

const RecurringDetailsContext = createContext<RecurringDetailsContextType | undefined>(undefined)

interface RecurringDetailsProviderProps {
  children: ReactNode;
}

export function RecurringDetailsProvider({ children }: RecurringDetailsProviderProps) {
  const [processedItems, setProcessedItems] = useState(new Set<ItemValue>());
  const [scheduledItems, setScheduledItems] = useState(new Set<ItemValue>());

  const add_items_processed = useCallback((item: ItemValue) => {
    // Isso faz com que automaticamente o item seja "movido" de uma lista para outra
    remove_items_scheduled(item)
    setProcessedItems(prev => {
      const newSet = new Set(prev);
      newSet.add(item);
      return newSet;
    })
  }, []);

  const remove_items_processed = useCallback((item: ItemValue) => {
    setProcessedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(item);
      return newSet;
    })
  }, []);

  const add_items_scheduled = useCallback((item: ItemValue) => {
    // Isso faz com que automaticamente o item seja "movido" de uma lista para outra
    remove_items_processed(item)
    setScheduledItems(prev => {
      const newSet = new Set(prev);
      newSet.add(item);
      return newSet;
    })
  }, []);
  const remove_items_scheduled = useCallback((item: ItemValue) => {
    setScheduledItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(item);
      return newSet;
    })
  }, []);

  const value = {
    items_processed: processedItems,
    items_scheduled: scheduledItems,
    add_items_processed,
    remove_items_processed,
    add_items_scheduled,
    remove_items_scheduled,
  }

  return (
    <RecurringDetailsContext.Provider
      value={value}>
      {children}
    </RecurringDetailsContext.Provider>
  )
}

export function useRecurringProcessedDetails(){
  const context = useContext(RecurringDetailsContext)
  if (context === undefined) {
    throw new Error('useRecurringProcessedDetails must be used within a RecurringDetailsProvider');
  }

  const items = context.items_processed
  const addItems = context.add_items_processed
  const removeItems = context.remove_items_processed

  return {
    items,
    addItems,
    removeItems
  };
}

export function useRecurringScheduledDetails(){
  const context = useContext(RecurringDetailsContext)
  if (context === undefined) {
    throw new Error('useRecurringScheduledDetails must be used within a RecurringDetailsProvider');
  }

  const items = context.items_scheduled
  const addItems = context.add_items_scheduled
  const removeItems = context.remove_items_scheduled

  return {
    items,
    addItems,
    removeItems
  };
}