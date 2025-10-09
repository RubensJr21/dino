import BasePage from "@components/ui/base/BasePage";
import { Fab } from "@components/ui/Fab";
import { list_all_banks } from "@data/playground/bank_account/list_all";
import { MCIcons } from "@lib/icons.lib";
import { BankAccountEntity } from "@lib/types";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

export default function Bank() {
  const route = useRouter()
  const scrollY = useRef(new Animated.Value(0));
  const theme = useTheme()

  const [banks, setBanks] = useState<BankAccountEntity[]>()

  useEffect(() => {
    list_all_banks()
      .then(banks => setBanks(banks))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar contas bancárias!")
      })
  }, [])

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
    route.navigate('/banks/register')
  }

  const goToEdit = (id: string) => {
    route.navigate({
      pathname: '/banks/[id]/edit',
      params: { id }
    })
  }

  if (banks === undefined) {
    return null;
  }

  return (
    <BasePage>
      <FlatList
        data={banks}
        contentContainerStyle={{
          rowGap: 10
        }}
        renderItem={({ item: bank }) => {
          return (
            <TouchableOpacity onPress={() => goToEdit(bank.id.toString())}>
              <View key={bank.id}
                style={{
                  backgroundColor: theme.colors.onPrimary,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text>{bank.nickname}</Text>
                <MCIcons
                  name='pencil-box'
                  onPress={() => goToEdit(bank.id.toString())}
                  color={theme.colors.primary}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          )
        }}
      />

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