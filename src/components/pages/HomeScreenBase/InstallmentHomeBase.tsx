import { TransactionInstallmentCard } from '@components/ui/TransactionInstallmentCard';
import { Installment } from '@domain/entities/installment.entity';
import { Kind } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase';
import { ReactNode, useRef } from 'react';
import { Animated, FlatList } from 'react-native';
import { Text } from "react-native-paper";

interface InstallmentHomeProps {
  kind: Kind,
  data: Array<Installment>,
  extras?: ReactNode;
  goToRegister: () => void;
  goToEdit: () => void;
}

export default function InstallmentHomeHomeBase({ kind, data, goToEdit, goToRegister }: InstallmentHomeProps) {
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
          renderItem={({ item: installment }) => (
            <TransactionInstallmentCard
              startDate={installment.start_date}
              description={installment.description}
              method={installment.transfer_method.method}
              tag={installment.tag.description}
              installmentsNumber={installment.installments_number}
              totalAmount={installment.total_amount}
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