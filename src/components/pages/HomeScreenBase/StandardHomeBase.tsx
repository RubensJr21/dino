import { TransactionStandardCard } from '@components/ui/TransactionStandardCard';
import { Standard } from '@domain/entities/standard.entity';
import { Kind } from '@lib/types';
import HomeScreenBase from '@pages/HomeScreenBase';
import { ReactNode, useRef } from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from "react-native-paper";

interface StandardHomeBaseProps {
  kind: Kind;
  extras?: ReactNode;
  data: Array<Standard>;
  goToRegister: () => void;
  goToEdit: () => void;
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
          renderItem={({ item: { id, description, item_value } }) => (
            <TransactionStandardCard
              scheduledAt={item_value.scheduled_at}
              description={description}
              method={item_value.transfer_method.method}
              tag={item_value.tag.description}
              status={item_value.was_processed}
              onToggleStatus={() => console.info("Toggle do Status...")}
              onEdit={goToEdit}
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