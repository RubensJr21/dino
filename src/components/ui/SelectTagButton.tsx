import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import { list_of_tags } from "@utils/factories/tag.factory";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

interface SelectTagButtonProps {
  tagSelected?: string
  onSelected: (tagSelected: string) => void
  style?: React.ComponentProps<typeof Button>["style"]
}

export function SelectTagButton({ tagSelected, onSelected, style }: SelectTagButtonProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false)
  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const [selection, setSelection] = useState(tagSelected ?? "")
  useEffect(() => {
    onSelected(selection)
  }, [selection])

  const data = useMemo(() => (
    Array.from(
      new Map(
        list_of_tags
          .map(tag => [tag.description, tag])))
      .sort(([descA], [descB]) => descA.localeCompare(descB))
  ), [])

  return (
    <>
      <Button style={style} onPress={show_modal}>
        {selection === "" ? "Selecionar categoria" : `Mudar categoria`}
      </Button>
      <CustomModal
        isOpen={open}
        dismiss_modal={dismiss_modal}
        title="Selecione uma categoria"
      >
        <FlatList
          data={data}
          style={{
            borderRadius: theme.roundness
          }}
          contentContainerStyle={{
            rowGap: 5,
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: theme.colors.backdrop,
          }}
          keyExtractor={([desc, { id }]) => `${id}`}
          renderItem={({ item: [desc] }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(desc)
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
              <Text>{desc}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}