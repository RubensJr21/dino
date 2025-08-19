import { Recurring } from "@src/core/entities/recurring.entity"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import BasePageView from "../../../components/BasePage/BasePageView"
import Fab from "../../../components/Fab"
import DefaultFlatListRecurring, { DefaultFlatListRecurringProps } from "../../../components/FlatList/DefaultFlatList/DefaultFlatListRecurring"
import SearchBarDate from "../../../components/SearchBar"

interface RecurringHomeScreenTemplateProps {
  data: Recurring[]
  navigateToEditPage: DefaultFlatListRecurringProps["navigateToEditPage"]
  navigateToDetailsPage: DefaultFlatListRecurringProps["navigateToDetailsPage"]
  fabAction: () => void
}

export default function RecurringHomeScreenTemplate({ data, navigateToEditPage, navigateToDetailsPage, fabAction }: RecurringHomeScreenTemplateProps) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    /* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
    O atributo a ser utilizado é a descrição ou valores.
    posteriormente será feita um filtro
     */
  }, [searchQuery]);

  return (
    <BasePageView>
      <SearchBarDate
        value={searchQuery}
        onChange={setSearchQuery}
        onPressIcon={(e) => {
          Alert.alert(
            "Selecione o intervalo de datas:",
            "Nessa funcionalidade será possível escolher um intervalo de datas"
          );
        }}
      />
      <DefaultFlatListRecurring
        {...{data}}
        {...{navigateToEditPage}}
        {...{navigateToDetailsPage}}
      />
      <Fab
        icon="plus"
        onPress={fabAction}
      />
    </BasePageView>
  )
}