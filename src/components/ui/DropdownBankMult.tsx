import Button from "@components/ui/Button";
import { list_of_tags } from "@utils/factories/tag.factory";
import { BlurView } from "expo-blur";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, TouchableHighlight, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, TextInput, useTheme } from "react-native-paper";

export function DropdownBankMulti() {
  const theme = useTheme();

  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState("")
  const [search, setSearch] = useState("")

  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const ModalBox = useCallback(({ children }: { children: ReactNode }) => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BlurView
        intensity={35}
        style={[StyleSheet.absoluteFill]}
        onTouchEndCapture={() => dismiss_modal()}
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

  const DismissButton = useCallback(() => (
    <Button onPress={() => dismiss_modal()}>
      Fechar
    </Button>
  ), [])

  const data = useMemo(() => (
    Array.from(
      new Map(
        list_of_tags
          .map(tag => [tag.description, tag])))
      .filter(([desc]) => desc.includes(search))
      .sort(([descA], [descB]) => descA.localeCompare(descB))
  ), [search])

  return (
    <>
      <Button onPress={() => show_modal()}>
        {selection === "" ? "Selecionar categoria" : `Categoria selecionada: ${selection}`}
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
          <TextInput mode="outlined" onChangeText={setSearch} />
          <FlatList
            data={data}
            style={{
              borderRadius: theme.roundness
            }}
            contentContainerStyle={{
              rowGap: 5,
              paddingVertical: data.length > 0 ? 5 : 0,
              paddingHorizontal: 5,
              backgroundColor: theme.colors.backdrop,
            }}
            keyExtractor={([desc, { id }]) => `${id}`}
            renderItem={({ item: [desc, tag] }) => (
              <TouchableHighlight
                onPress={() => {
                  setSelection(tag.description)
                  dismiss_modal()
                }}
                style={{
                  backgroundColor: theme.colors.inversePrimary,
                  borderRadius: theme.roundness,
                  paddingHorizontal: 8,
                  paddingVertical: 16
                }}
                underlayColor={theme.colors.inverseOnSurface}
              >
                <Text>{tag.description}</Text>
              </TouchableHighlight>
            )}
            ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
          />
          <DismissButton />
        </ModalBox>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  dropdownBox: {
    // minHeight: 200,
    maxHeight: 400,
    overflow: "hidden",
    rowGap: 5,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
})