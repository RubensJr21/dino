import { CallToast } from "@lib/call-toast";
import { Entypo, IconNames } from "@lib/icons.lib";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { initialDataBase, TransactionScreenBase } from ".";
import { installmentStrategies } from "../../../lib/strategies";
import { InstallmentScreenInsert, Kind } from "../../../lib/types";

interface InstallmentScreenProps {
  id?: string;
  kind: Kind
}

const initialDataInstallment = {
  ...initialDataBase,
  installments: 1,
} satisfies InstallmentScreenInsert;

const DEFAULT_MIN_INSTALLMENT_NUMBER = 2

export default function InstallmentScreen({ id, kind }: InstallmentScreenProps) {
  return (
    <TransactionScreenBase<InstallmentScreenInsert>
      id={id}
      initialData={initialDataInstallment}
      fetchById={installmentStrategies[kind].fetchById}
      onInsert={installmentStrategies[kind].insert}
      renderExtras={(p, pr) => (
        <View style={{
          flexDirection: "row",
          width: "100%",
          columnGap: 5,
          paddingVertical: 5
        }}>
          <ButtonStepper iconName="minus" />
          <TextInput
            // value={""}
            onLayout={(event) => {
              event.currentTarget.setNativeProps({
                value: 0
              })
            }}
            onChangeText={(text: string) => {
              const onlyNumbers = /[0-9]*/g.exec(text)?.[0] ?? `${DEFAULT_MIN_INSTALLMENT_NUMBER}`
              CallToast(`Valor inserido: ${onlyNumbers}`)
            }}
            style={styles.textInputValue}
            maxLength={6}
            contentStyle={{ textAlign: "center" }}
            inputMode="numeric"
            mode="outlined"
          />
          <ButtonStepper iconName="plus" />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  textInputValue: {
    flex: 1
  }
})

type GetIconNames<U> = U extends IconNames<typeof Entypo> ? U : never

interface ButtonStepperProps {
  iconName: GetIconNames<"plus" | "minus">
}

function ButtonStepper({ iconName }: ButtonStepperProps) {
  const theme = useTheme()

  // Padrões extraídos da lib 'react-native-paper':
  // disabled: theme.colors.surfaceDisabled
  // elevated: theme.colors.elevation.level1;
  // contained: theme.colors.primary;
  // contained-tonal: theme.colors.secondaryContainer;
  const buttonColor = theme.colors.secondaryContainer

  // disable: theme.colors.onSurfaceDisabled;
  // type dark is boolean & (contained | contained - tonal | elevated)
  // ↳  dark:'#ffffff'
  // ↳  light: '#000000'
  // outlined | text | elevated: theme.colors.primary
  // contained: theme.colors.onPrimary
  // contained - tonal: theme.colors.onSecondaryContainer
  const iconColor = theme.colors.onSecondaryContainer
  return (
    <TouchableOpacity
      style={{
        backgroundColor: buttonColor,
        aspectRatio: 1,
        borderRadius: theme.roundness
      }}
    >
      <Entypo style={{ textAlign: "center", textAlignVertical: "center", aspectRatio: 1 }} name={iconName} size={25} color={iconColor} />
    </TouchableOpacity>
  )
}