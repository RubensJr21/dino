import { TransactionInstallmentCard } from '@components/ui/TransactionCards/WithActions/Installment';
import { InstallmentEntity, Kind } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase';
import { ReactNode, useRef } from 'react';
import { Animated, FlatList } from 'react-native';
import { Text } from "react-native-paper";

interface InstallmentHomeProps {
  kind: Kind,
  data: Array<InstallmentEntity>,
  extras?: ReactNode;
  goToRegister: () => void;
  goToEdit: () => void;
  goToDetails: () => void;
}

export default function InstallmentHomeHomeBase({ kind, data, goToEdit, goToRegister, goToDetails }: InstallmentHomeProps) {
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
              startDate={installment.startDate}
              description={installment.description}
              transactionInstrument={installment.transactionInstrument}
              category={installment.category}
              installmentsNumber={Number(installment.installments)}
              totalAmount={Number(installment.amountValue)}
              onToggleIsDisabled={() => console.info("Toggle do isDisabled...")}
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