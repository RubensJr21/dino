import Button from "@components/ui/base/Button";
import { CustomModal } from "@components/ui/base/CustomModal";
import * as cat_fns from "@data/playground/category";
import { Category, CategoryEntity } from "@lib/types";
import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

interface SelectCategoryButtonProps {
  category: Category
  onSelected: (category: Category) => void
  style?: React.ComponentProps<typeof Button>["style"]
}

export function SelectCategoryButton({ category, onSelected, style }: SelectCategoryButtonProps) {
  const theme = useTheme();

  const [data, setData] = useState<CategoryEntity[]>()

  useEffect(() => {
    cat_fns.find_all().then(categories => setData(categories))
  }, [])

  const [open, setOpen] = useState(false)
  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const [selection, setSelection] = useState(category)
  useEffect(() => {
    onSelected(selection)
  }, [selection])

  return (
    <>
      <Button style={style} onPress={show_modal}>
        {selection?.id === -1 ? "Selecionar categoria" : `Mudar categoria`}
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
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item: cat }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(cat)
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
              <Text>{cat.code}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}