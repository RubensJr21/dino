import { getKindLabel, Kind, StandardEntity } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase/base';
import { TransactionStandardCard } from '@pages/HomeScreenBase/Standard/components/Card';
import { ReactNode, useRef } from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from "react-native-paper";

interface StandardHomeProps {
  kind: Kind;
  extras?: ReactNode;
  data: Array<StandardEntity>;
  goToRegister: () => void;
  goToEdit: (id: string) => void;
}

export default function StandardHome({ kind, data, goToEdit, goToRegister }: StandardHomeProps) {
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
              id={standard.id.toString()}
              scheduledAt={standard.scheduledAt}
              description={standard.description}
              transactionInstrument={standard.transactionInstrument}
              category={standard.category}
              amountValue={standard.amountValue}
              status={standard.wasProcessed}
              onEdit={goToEdit}
            />
          )}
          ListEmptyComponent={<Text>Nenhum {getKindLabel(kind)} encontrado.</Text>}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
            { useNativeDriver: false }
          )}
        />
      }
    />
  )
}