import Button from "@components/ui/Button";
import { BlurView } from "expo-blur";
import React, { ReactNode, useMemo } from "react";
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  dismiss_modal: () => void;
  title: string;
}

export function CustomModal({ children, isOpen, dismiss_modal, title }: Props) {
  const theme = useTheme()

  const BlurBackground = useMemo(() => (
    <BlurView intensity={35} style={[StyleSheet.absoluteFill]} onTouchEndCapture={dismiss_modal} />
  ), [dismiss_modal])

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} >
        {BlurBackground}
        <View style={styles.containerRoot}>
          <View style={[styles.dropdownBox, { backgroundColor: theme.colors.background, borderRadius: theme.roundness }]}>
            <Text variant="headlineSmall" style={styles.title}>
              {title}
            </Text>

            {children}

            <Button onPress={dismiss_modal}>
              Fechar
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16
  },
  dropdownBox: {
    minHeight: 400,
    maxHeight: 400,
    overflow: "hidden",
    rowGap: 5,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  title: {
    textAlign: 'center',
    fontWeight: "bold"
  }
})