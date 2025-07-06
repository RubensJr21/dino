import { Installment } from "@src/core/entities/installment.entity"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import Fab from "../../../components/ActionsFab/Fab"
import BasePageView from "../../../components/BasePage/BasePageView"
import DefaultFlatListInstallment, { DefaultFlatListInstallmentProps } from "../../../components/DefaultFlatList/DefaultFlatListInstallment"
import SearchBarDate from "../../../components/SearchBar"

interface InstallmentHomeScreenTemplateProps {
  data: Installment[]
  navigateToEditPage: DefaultFlatListInstallmentProps["navigateToEditPage"]
  fabAction: () => void
}

export default function InstallmentHomeScreenTemplate({ data, navigateToEditPage, fabAction }: InstallmentHomeScreenTemplateProps) {
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
      <DefaultFlatListInstallment
        {...{data}}
        {...{navigateToEditPage}}
      />
      <Fab
        icon="plus"
        onPress={fabAction}
      />
    </BasePageView>
  )
}