import { TransactionStandardCard } from '@components/ui/TransactionStandardCard';
import { Kind, StandardEntity } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase';
import { ReactNode, useRef } from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from "react-native-paper";

interface StandardHomeBaseProps {
  kind: Kind;
  extras?: ReactNode;
  data: Array<StandardEntity>;
  goToRegister: () => void;
  goToEdit: (id: string) => void;
}

export default function StandardHomeBase({ kind, data, goToEdit, goToRegister }: StandardHomeBaseProps) {
  const scrollY = useRef(new Animated.Value(0));

  return (
    <HomeScreenBase
      refFab={scrollY}
      goToRegister={goToRegister}
      flatlist={
        <FlatList
          data={data}
          keyExtractor={standard => `${standard.id}`}
          style={{ marginTop: 5 }}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 5 }}
          renderItem={({ item: standard }) => (
            <TransactionStandardCard
              scheduledAt={standard.scheduledAt}
              description={standard.description}
              transactionInstrument={standard.transactionInstrument}
              category={standard.category}
              status={standard.wasProcessed}
              onToggleStatus={() => console.info("Toggle do Status...")}
              onEdit={() => goToEdit(standard.id.toString())}
            />
          )}
          ListEmptyComponent={<Text>Nenhum {kind} encontrado.</Text>}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
            { useNativeDriver: false }
          )}
        // estimatedItemSize={116}
        />
      }
    />
  )
}