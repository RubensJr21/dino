import { EmptyListAlert } from '@components/ui/EmptyListAlert';
import { recurringStrategies } from '@lib/strategies';
import { getKindIconName, getKindLabel, Kind, RecurringEntity } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase/base';
import { useLocalSearchParams } from 'expo-router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TransactionRecurringCard } from './components/Card';

interface RecurringHomeProps {
  kind: Kind;
  extras?: ReactNode;
  goToRegister: () => void;
  goToEdit: (id: string) => void;
  goToDetails: (id: string) => void;
}

export default function RecurringHome({ kind, goToEdit, goToRegister, goToDetails }: RecurringHomeProps) {
  const scrollY = useRef(new Animated.Value(0));

  const { update } = useLocalSearchParams<{ update?: string }>()
  const [data, setData] = useState<RecurringEntity[]>([])

  const fetchData = useCallback(() => {
    recurringStrategies[kind]
      .list_all()
      .then(recurrings => setData(recurrings))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar transações!")
      })
  }, [setData])

  useEffect(() => {
    fetchData()
  }, [update])

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
              onEdit={goToEdit}
              goToDetails={goToDetails}
            />
          )}
          ListEmptyComponent={
            <EmptyListAlert
              iconName={getKindIconName(kind)}
              message={`Nenhum ${getKindLabel(kind)} recorrente encontrado.`}
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
            { useNativeDriver: false }
          )}
        />
      }
    />
  )
}