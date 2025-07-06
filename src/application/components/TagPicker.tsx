import { Picker } from "@react-native-picker/picker";
import { tags_available, TagsAvailable } from "@src/core/start_configs";
import { useRef, useState } from "react";
import { StyleSheet } from 'react-native';
import { Text, useTheme } from "react-native-paper";

export interface InputTagTypeRef {
  value: React.MutableRefObject<TagsAvailable>;
  changeType: (text: TagsAvailable) => void;
}

export function useRefTagPicker(initialValue: TagsAvailable): InputTagTypeRef {
  const ref = useRef<TagsAvailable>(initialValue);
  const changeType = (text: TagsAvailable) => ref.current = text;
  return {
    value: ref,
    changeType,
  };
}

interface TagPickerProps {
  label: string;
  refTagPicker: InputTagTypeRef;
}

export default function TagPicker({ label, refTagPicker }: TagPickerProps) {
  const theme = useTheme();
  const [selectedTag, setSelectedTag] = useState<TagsAvailable>(refTagPicker.value.current);

  return (
    <>
      <Text
        children={label}
        style={styles.label}
        variant="titleMedium"
      />
      <Picker
        style={{
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.elevation.level4,
        }}
        dropdownIconColor={theme.colors.onSurface}
        selectedValue={selectedTag}
        onValueChange={(itemValue, itemIndex) => {
          refTagPicker.changeType(itemValue)
          setSelectedTag(itemValue)
        }
        }>
        {Object.entries(tags_available).map(([key, displayText]) => (
          <Picker.Item key={key} label={displayText} value={key} />
        ))}
      </Picker>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    textAlignVertical: "center"
  }
});