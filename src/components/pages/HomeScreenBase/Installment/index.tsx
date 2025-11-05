import { EmptyListAlert } from '@components/ui/EmptyListAlert';
import { installmentStrategies } from '@lib/strategies';
import { getKindIconName, getKindLabel, InstallmentEntity, Kind } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase/base';
import { TransactionInstallmentCard } from '@pages/HomeScreenBase/Installment/components/Card';
import { useLocalSearchParams } from 'expo-router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, FlatList } from 'react-native';

interface InstallmentHomeProps {
  kind: Kind,
  extras?: ReactNode;
  goToRegister: () => void;
  goToEdit: (id: string) => void;
  goToDetails: (id: string) => void;
}

export default function InstallmentHome({ kind, goToEdit, goToRegister, goToDetails }: InstallmentHomeProps) {
  const scrollY = useRef(new Animated.Value(0));

  const { update } = useLocalSearchParams<{ update?: string }>()
  const [data, setData] = useState<InstallmentEntity[]>([])

  const fetchData = useCallback(() => {
    installmentStrategies[kind]
      .list_all()
      .then(installments => setData(installments))
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
          keyExtractor={installment => `${installment.id}`}
          style={{ marginTop: 5 }}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 5 }}
          renderItem={({ item: installment }) => (
            <TransactionInstallmentCard
              id={installment.id.toString()}
              startDate={installment.startDate}
              description={installment.description}
              transactionInstrument={installment.transactionInstrument}
              category={installment.category}
              installmentsNumber={Number(installment.installments)}
              totalAmount={Number(installment.amountValue)}
              onEdit={goToEdit}
              goToDetails={goToDetails}
            />
          )}
          ListEmptyComponent={
            <EmptyListAlert
              iconName={getKindIconName(kind)}
              message={`Nenhum ${getKindLabel(kind)} parcelado encontrado.`}
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