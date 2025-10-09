import { InstallmentEntity, Kind } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase/base';
import { TransactionInstallmentCard } from '@pages/HomeScreenBase/Installment/components/Card';
import { ReactNode, useRef } from 'react';
import { Animated, FlatList } from 'react-native';
import { Text } from "react-native-paper";

interface InstallmentHomeProps {
  kind: Kind,
  data: Array<InstallmentEntity>,
  extras?: ReactNode;
  goToRegister: () => void;
  goToEdit: (id: string) => void;
  goToDetails: (id: string) => void;
}

export default function InstallmentHome({ kind, data, goToEdit, goToRegister, goToDetails }: InstallmentHomeProps) {
  const scrollY = useRef(new Animated.Value(0));

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
          ListEmptyComponent={<Text>Nenhum {kind} encontrado.</Text>}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
            { useNativeDriver: false }
          )}
        />
      }
    />
  )
}