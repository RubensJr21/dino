import { CSSProperties } from "react"
import { View } from "react-native"
import Label from "./Label"

interface LegendProps {
  executedColor: NonNullable<CSSProperties['color']>,
  executedValue: number
  plannedColor: NonNullable<CSSProperties['color']>,
  plannedValue: number
}

export default function Legend({ executedColor, plannedColor, executedValue, plannedValue }: LegendProps) {
  return (
    <View style={{ alignSelf: "center", flexDirection: 'row', columnGap: 5 }}>
      <Label
        caption="executado"
        sizeLabelItems={16}
        squareColor={executedColor}
        value={executedValue}
      />
      <Label
        caption="planejado"
        sizeLabelItems={16}
        squareColor={plannedColor}
        value={plannedValue}
      />
    </View>
  )
}