import { Dropdown, Option } from '@app-components/Dropdown';
import { useNavigation } from "@react-navigation/native";
import { ITag } from '@src/core/entities/tag.entity';
import { tags_available, TagsAvailable } from "@src/core/start_configs";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { Text } from "react-native-paper";
import TagApi from "../api/tag.api";
import { DropdownTypeRef, useRefDropdown } from "./Dropdown/_context";

interface TagDropdownProps {
  label: string;
  refTagDropdown: DropdownTypeRef<string>;
}

// Valor padrão. OBS: NÃO É UM ID VALIDO
export const TAG_DEFAULT_VALUE = {
  label: "",
  value: -1
} as const satisfies Option<ITag["id"]>

export function useRefTagDropdown(initialValue: string) {
  return useRefDropdown<string>(initialValue)
}

interface TagAvailableOptionType extends Option<ITag["id"]> { }

const tagsAvailableKeys = Object.keys(tags_available)

function parseToDescription(display_text: string) {
  for (const description of tagsAvailableKeys) {
    if (tags_available[description as TagsAvailable] === display_text) {
      return description
    }
  }
  return "CODE_FOR_(display_text)_NOT_FOUNDED"
}

export default function TagDropdown({ label, refTagDropdown }: TagDropdownProps) {
  const navigation = useNavigation()
  const [tagsAvailable, setTagsAvailable] = useState<Array<TagAvailableOptionType>>([])
  const [tagSelected, setTagSelected] = useState<Option<ITag["id"]>>(TAG_DEFAULT_VALUE)

  useLayoutEffect(() => {
    TagApi.list_all().then(tags => {
      if (tags === undefined) {
        Alert.alert(
          "Erro ocorreu ao carregar os bancos!",
          "Não foi possível carregar os bancos."
        )
        return;
      }
      if (tags.length === 0) {
        Alert.alert("Atenção!", "É necessário ter, pelo menos, uma tag cadastrada!")
        navigation.goBack()
        return;
      }

      const tagOptions = tags.map(tag => ({
        // Garanto que é índice pois os dados foram inseridos durante a inicialização do app
        label: tags_available[tag.description] ?? "Tag not Founded",
        value: tag.id,
      }))

      setTagsAvailable(tagOptions)

      const initialTagSelected = tagOptions.find((option) => {
        return option.label === refTagDropdown.selected.current
      }) ?? tagOptions[0]

      setTagSelected(initialTagSelected)
    })
  }, [])

  useEffect(() => {

    refTagDropdown.changeSelected(parseToDescription(tagSelected.label))
  }, [tagSelected])

  // Significa que ainda não carregou o valor
  if (tagsAvailable.length === 0) {
    return null;
  }

  // Significa que ainda não carregou o valor
  if (tagSelected.value === -1) {
    return null;
  }

  return (
    <Dropdown
      label={label}
      choose={tagSelected}
      options={tagsAvailable}
      onSelect={(selected) => {
        setTagSelected(selected)
      }}
      renderItem={(label) => (
        <Text>{label}</Text>
      )}
    />
  );
}