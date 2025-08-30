import Button from "@components/ui/Button";
import { useTheme } from "react-native-paper";

type ButtonSubmitProps = StrictOmit<React.ComponentProps<typeof Button>, "children"> & { onInsert: () => void }

// Padrões extraídos da lib 'react-native-paper':
// disabled: theme.colors.surfaceDisabled
// elevated: theme.colors.elevation.level1;
// contained: theme.colors.primary;
// contained-tonal: theme.colors.secondaryContainer;
export function ButtonSubmit({ onInsert, ...props }: ButtonSubmitProps) {
  const theme = useTheme()
  return (
    <Button
      onPress={onInsert}
      // Caso o 'mode' do @components/ui/Button.tsx mude, mudar aqui também
      buttonColor={theme.colors.secondaryContainer}
      {...props}
    >
      Enviar
    </Button>
  )
}