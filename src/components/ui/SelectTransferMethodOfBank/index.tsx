import Button from "@components/ui/Button";
import { PageSteps } from "@components/ui/PageSteps";
import { BlurView } from "expo-blur";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, TouchableHighlight, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function SelectTransferMethodOfBank() {
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const [bankSelected, setBankSelected] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const next = useCallback((bankSelected: string) => {
    setBankSelected(bankSelected)
    setPageIndex(prev => {
      if (prev + 1 > 1) {
        console.info(`Não vou mudar pois pageIndex(${pageIndex}) ficaria > 1`)
        return prev;
      } else {
        return prev + 1
      }
    })
  }, [setPageIndex])

  const prev = useCallback(() => {
    setPageIndex(prev => {
      if (prev - 1 < 0) {
        console.info(`Não vou mudar pois pageIndex(${pageIndex}) ficaria < 0`)
        return prev;
      } else {
        return prev - 1
      }
    })
  }, [setPageIndex])

  const dataBank = useMemo(() => (
    [
      { nome: "Bank 1" },
      { nome: "Bank 2" },
      { nome: "Bank 3" },
      { nome: "Bank 4" },
      { nome: "Bank 6" },
      { nome: "Bank 7" },
      { nome: "Bank 8" },
      { nome: "Bank 9" },
    ]
      .sort(({ nome: nameA }, { nome: nameB }) => nameA.localeCompare(nameB))
  ), [])

  const [dataTransferMethod, setDataTransferMethod] = useState<Array<{ method: string }>>([])
  const [loadingTransferMethods, setLoadingTransferMethods] = useState(false);

  useEffect(() => {
    console.warn("Vou mudar lista de transfer method...")
    setLoadingTransferMethods(true)
    setTimeout(() => {
      const sizeList = Math.floor(Math.random() * 10)
      console.log(`sizeList = ${sizeList}`)
      const list = Array.from({ length: sizeList }).map((_, index) => (
        { method: `${bankSelected} - Method ${index}` }
      ))
      setDataTransferMethod(list)
    }, 1500)
  }, [bankSelected])

  useEffect(() => {
    if (loadingTransferMethods) {
      setLoadingTransferMethods(false);
    }
  }, [dataTransferMethod])

  useEffect(() => {
    console.log(`Mudei pageIndex para ${pageIndex}`)
  }, [pageIndex])

  useEffect(() => {
    console.info("Mudando bankSelected")
  }, [bankSelected])

  const ModalBox = useCallback(({ children }: { children: ReactNode }) => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BlurView
        intensity={35}
        style={[StyleSheet.absoluteFill]}
        onTouchEndCapture={dismiss_modal}
      />
      <View
        style={[
          { flex: 1, justifyContent: "center", paddingHorizontal: 16 }
        ]}>
        <View style={[styles.dropdownBox, { backgroundColor: theme.colors.background, borderRadius: theme.roundness }]}>
          {children}
        </View>
      </View>
    </KeyboardAvoidingView>
  ), [])

  const PageBank = useCallback(() => (
    <FlatList
      data={dataBank}
      style={{
        flex: 1,
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.backdrop
      }}
      contentContainerStyle={{
        rowGap: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
      }}
      keyExtractor={({ nome }) => `${nome}`}
      renderItem={({ item: { nome } }) => (
        <TouchableHighlight
          onPress={() => next(nome)}
          style={{
            backgroundColor: nome === bankSelected ? "green" : theme.colors.inversePrimary,
            borderRadius: theme.roundness,
            paddingHorizontal: 8,
            paddingVertical: 16
          }}
          underlayColor={theme.colors.inverseOnSurface}
        >
          <Text>{nome}</Text>
        </TouchableHighlight>
      )}
      ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
    />
  ), [dataBank, bankSelected, next])

  const PageTransferMethod = useCallback(() => (
    <FlatList
      data={dataTransferMethod}
      style={{
        flex: 1,
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.backdrop
      }}
      contentContainerStyle={{
        rowGap: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
      }}
      keyExtractor={({ method }) => `${method}`}
      renderItem={({ item: { method } }) => (
        <TouchableHighlight
          onPress={() => prev()}
          style={{
            backgroundColor: theme.colors.inversePrimary,
            borderRadius: theme.roundness,
            paddingHorizontal: 8,
            paddingVertical: 16
          }}
          underlayColor={theme.colors.inverseOnSurface}
        >
          <Text>{method}</Text>
        </TouchableHighlight>
      )}
      ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
    />
  ), [dataTransferMethod, prev])

  const PageStepsMemo = useMemo(() => {
    return (
      <PageSteps pageIndex={pageIndex}>
        <PageBank />
        {
          !loadingTransferMethods
            ?
            <PageTransferMethod />
            :
            <ActivityIndicator />
        }
      </PageSteps>
    )
  }, [pageIndex, loadingTransferMethods])

  return (
    <>
      <Button onPress={show_modal}>
        {"Selecionar o método de transferência"}
      </Button>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
      >
        <ModalBox>
          <Text
            variant="headlineSmall"
            style={{ textAlign: 'center', fontWeight: "bold" }}
          >
            Selecione uma Categoria
          </Text>
          {PageStepsMemo}
        </ModalBox>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdownBox: {
    minHeight: 400,
    maxHeight: 400,
    overflow: "hidden",
    rowGap: 5,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
})