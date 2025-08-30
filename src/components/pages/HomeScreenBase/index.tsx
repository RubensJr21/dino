import BasePage from '@components/ui/BasePage';
import { Fab } from '@components/ui/Fab';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface HomeScreenBaseProps<T> {
  refFab: React.RefObject<Animated.Value>;
  flatlist: React.ReactElement<FlatList<T>>;
  goToRegister: () => void;
}

export default function HomeScreenBase<T>({ refFab: scrollY ,flatlist, goToRegister }: HomeScreenBaseProps<T>) {
  // const scrollY = useRef(new Animated.Value(0));

  // interpolação para desaparecer o FAB próximo ao fim da lista
  const fabTranslateY = scrollY.current.interpolate({
    inputRange: [0, 150], // ajuste conforme altura que quer animar
    outputRange: [0, 80], // desloca 80 para baixo
    extrapolate: 'clamp',
  });

  const fabOpacity = scrollY.current.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <BasePage style={{ margin: 0, padding: 0 }}>

      {flatlist}
      
      <Animated.View
        style={{
          position: 'absolute',
          // Torna desnecessário o right e bottom que Fab já tinha
          right: 16,
          bottom: 16,
          transform: [{ translateY: fabTranslateY }],
          opacity: fabOpacity,
        }}
      >
        <Fab iconName='plus' onPress={goToRegister} />
      </Animated.View>
    </BasePage>
  )
}