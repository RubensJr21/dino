import BasePage from "@components/ui/base/BasePage";
import Button from "@components/ui/base/Button";
import { Fab } from "@components/ui/Fab";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Animated } from "react-native";
import { Text } from "react-native-paper";

export default function Bank() {
  const route = useRouter()
  const scrollY = useRef(new Animated.Value(0));

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

  const goToRegister = () => {
    route.navigate('/manage/bank/register')
  }

  const goToEdit = () => {
    route.navigate({
      pathname: '/manage/bank/[id]/edit',
      params: { id: '123' }
    })
  }

  return (
    <BasePage>
      <Text>Bank</Text>
      <Button onPress={goToEdit}>
        Navegar para edição
      </Button>

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