import { FlatList, FlatListProps, StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { FlatListDivider } from "../FlatListDivider";

interface Props<T> {
  data: FlatListProps<T>["data"],
  renderItem: FlatListProps<T>["renderItem"]
  keyExtractor: FlatListProps<T>["keyExtractor"]
}

export default function DefaultFlatList<T>({ data, renderItem, keyExtractor }: Props<T>) {
  return (
    <FlatList
        style={styles.flatlist_style}
        contentContainerStyle={styles.flatlist_contentContainerStyle}
        numColumns={1}
        horizontal={false}
        data={data}
        // Para evitar problema no Scroll do BasePageView
        nestedScrollEnabled={true}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhum pagamento encontrado.</Text>}
        keyExtractor={keyExtractor}
        // Adiciona espaçamento de tamanho 5 na parte de baixo do FlatList
        ListFooterComponent={<View style={{height: 50}} />}
        ItemSeparatorComponent={() => <FlatListDivider />}
      />
  )
}

const styles = StyleSheet.create({
  flatlist_style: {
    marginTop: 10
  },
  flatlist_contentContainerStyle: {
    // rowGap: 10,
  }
});