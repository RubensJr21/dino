import { Kind, RecurringEntity } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase/base';
import { TransactionRecurringCard } from '@pages/HomeScreenBase/Recurring/components/Card';
import { ReactNode, useRef } from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from "react-native-paper";

interface RecurringHomeProps {
  kind: Kind;
  extras?: ReactNode;
  data: Array<RecurringEntity>;
  goToRegister: () => void;
  goToEdit: () => void;
}

export default function RecurringHome({ kind, data, goToEdit, goToRegister }: RecurringHomeProps) {
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
          renderItem={({ item: recurring }) => (
            <TransactionRecurringCard
              startDate={recurring.startDate}
              description={recurring.description}
              transactionInstrument={recurring.transactionInstrument}
              category={recurring.category}
              isDisabled={recurring.endDate !== null}
              onToggleIsDisabled={() => console.info("Toggle do isDisabled...")}
              onEdit={goToEdit}
              goToDetails={() => console.info("Navegando para a tela de detalhes...")}
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