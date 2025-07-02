import { CSSProperties } from "react"
import { StyleSheet, View, ViewProps } from "react-native"

interface SquareProps extends ViewProps {
  color: NonNullable<CSSProperties['color']>,
  size: number
}

export default function Square({ color, size }: SquareProps) {
  const styles = StyleSheet.create({
    square: {
      backgroundColor: color,
      width: size,
      height: size,
    }
  })
  return <View style={styles.square} />
}