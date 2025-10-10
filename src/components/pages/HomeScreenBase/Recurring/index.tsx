import { getKindLabel, Kind, RecurringEntity } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase/base';
import { ReactNode, useRef } from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from "react-native-paper";
import { TransactionRecurringCard } from './components/Card';

interface RecurringHomeProps {
  kind: Kind;
  extras?: ReactNode;
  data: Array<RecurringEntity>;
  goToRegister: () => void;
  goToEdit: (id: string) => void;
  goToDetails: (id: string) => void;
}

export default function RecurringHome({ kind, data, goToEdit, goToRegister, goToDetails }: RecurringHomeProps) {
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
              id={recurring.id.toString()}
              startDate={recurring.startDate}
              description={recurring.description}
              transactionInstrument={recurring.transactionInstrument}
              category={recurring.category}
              currentAmount={recurring.amountValue}
              isDisabled={recurring.endDate !== null}
              onToggleIsDisabled={() => console.info("Toggle do isDisabled...")}
              onEdit={goToEdit}
              goToDetails={goToDetails}
            />
          )}
          ListEmptyComponent={<Text>Nenhum {getKindLabel(kind)} recorrente encontrado.</Text>}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
            { useNativeDriver: false }
          )}
        />
      }
    />
  )
}