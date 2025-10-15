import Button from "@components/ui/base/Button";
import { useTheme } from "react-native-paper";

type ButtonSubmitProps = StrictOmit<React.ComponentProps<typeof Button>, "children"> & { onSubmit: () => void }

// Padrões extraídos da lib 'react-native-paper':
// disabled: theme.colors.surfaceDisabled
// elevated: theme.colors.elevation.level1;
// contained: theme.colors.primary;
// contained-tonal: theme.colors.secondaryContainer;
export function ButtonSubmit({ onSubmit, ...props }: ButtonSubmitProps) {
  const theme = useTheme()
  return (
    <Button
      onPress={onSubmit}
      // Caso o 'mode' do @components/ui/Button.tsx mude, mudar aqui também
      buttonColor={theme.colors.onPrimary}
      {...props}
    >
      Enviar
    </Button>
  )
}