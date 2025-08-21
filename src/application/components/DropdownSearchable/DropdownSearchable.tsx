import { BlurView } from "expo-blur";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { KeyboardAvoidingView, Modal, TextInput as NativeTextInput, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { ListDropdownSearchable } from "./_List";
import { SearchDropdownSearchable } from "./_Search";
import { DropdownSearchableContextType } from "./_context";

interface Props<T> {
  getContext: () => DropdownSearchableContextType<T>;
  label: string;
  renderItem: React.ComponentProps<typeof ListDropdownSearchable>["renderItem"]
}

export function DropdownSearchableIndex<T>({
  label,
  getContext,
  renderItem
}: Props<T>) {
  const context = getContext()
  const {
    modalIsVisible,
    show_modal,
    dismiss_modal,
    selected,
  } = context

  const theme = useTheme();

  const inputRef = useRef<NativeTextInput>(null)

  useEffect(() => {
    if (modalIsVisible === true) {
      inputRef.current?.blur()
    }
  }, [modalIsVisible])

  const Label = useCallback(() => (
    <Text
      variant="bodySmall"
      style={{
        position: "absolute",
        left: 7,
        top: 0,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 6
      }}
      children={label} />
  ), [])

  const ModalCallInput = useCallback(() => (
    <TextInput
      ref={inputRef}
      mode="outlined"
      style={{marginTop: 8}}
      value={selected.label}
      onFocus={() => show_modal()}
      showSoftInputOnFocus={false} // não abrir teclado no campo principal
      right={
        <TextInput.Icon
          onPress={() => show_modal()}
          icon={modalIsVisible ? "menu-up" : "menu-down"}
        />}
      cursorColor="transparent"
    />
  ), [selected, modalIsVisible])

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
        <View style={[styles.dropdownBox, { backgroundColor: theme.colors.background }]}>
          {children}
        </View>
      </View>
    </KeyboardAvoidingView>
  ), [])

  const DismissButton = useCallback(() => (
    <Button onPress={() => dismiss_modal()} style={{ margin: 8 }}>
      Fechar
    </Button>
  ), [])

  return (
    <View>
      {/* <ModalCallButton /> */}
      <View>
        <ModalCallInput />
        <Label />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalIsVisible}
      >
        <ModalBox>
          <Text
            variant="headlineSmall"
            style={{ textAlign: 'center', fontWeight: "bold", paddingVertical: 8, paddingHorizontal: 8 }}
          >
            {label}
          </Text>
          <SearchDropdownSearchable {...{context}} />
          <ListDropdownSearchable {...{ context, renderItem }} />
          <DismissButton />
        </ModalBox>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdownBox: {
    maxHeight: 400,
    borderRadius: 12,
    overflow: "hidden",
  },
})