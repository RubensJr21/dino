import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";

interface ToggleProps {
  label: string;
  value: boolean;
}

export interface ToggleRef {
  value: boolean;
}

export function useRefToggle(): React.RefObject<ToggleRef> {
  return useRef<ToggleRef>({value: false});
}

const Toggle = forwardRef<ToggleRef, ToggleProps>(({ value: value_received = false, label }, ref) => {
  const [value, setValue] = useState<boolean>(value_received);

  useImperativeHandle(ref, () => {
    return { value };
  });

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignSelf: "center", flexWrap: "wrap", width: "100%" }}>
      <Text
        children={label}
        style={styles.label}
        variant="headlineSmall"
      />
      
      <Switch
        value={value}
        onValueChange={() => setValue(!value)}
        style={{}}
      />
    </View>
  );
	}
);

export default Toggle;

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    textAlignVertical: "center"
  }
});
