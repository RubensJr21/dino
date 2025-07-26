import { DateString } from "@src/application/functions/date2String";
import { Standard } from "@src/core/entities/standard.entity";

export interface GroupedStandardByDate {
  date: string;
  standards: Standard[]
}

export function groupStandardByDate(
  receipts: Standard[]
): GroupedStandardByDate[] {
  const grouped = receipts.reduce((acc, item) => {
    const date = new DateString(item.item_value.scheduled_at).toString(); // A data no formato "DD/MM/AAAA"

    // Se a data não existe no acumulador, cria um array vazio
    if (!acc[date]) {
      acc[date] = [];
    }

    // Adiciona o item ao grupo correspondente
    acc[date].push(item);

    return acc;
  }, {} as Record<string, Standard[]>);

  // Converte o objeto agrupado em uma lista de objetos
  return Object.entries(grouped).map(([date, standards]) => ({
    date,
    standards,
  }));
}