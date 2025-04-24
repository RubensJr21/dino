import { Color_Generate, Color_Get } from "@application/lib/colors";
import { CSSPropertiesColor, PreferenceType } from "@src/types/color";

type Info = {
    type: 'Entrada'|'Saída'
    description: string
}

export interface CardData {
    id: string
    info: Info
    executedColor: CSSPropertiesColor
    executedValue: number
    plannedColor: CSSPropertiesColor
    plannedValue: number
}

const infos: Info[] = [
    {type: 'Saída', description: 'Gastos do mês'},
    {type: 'Saída', description: 'Orçamento de gastos'},
    {type: 'Saída', description: 'Cartão de crédito'},
    {type: 'Entrada', description: 'Valores recebidos'},
]

export function generateCardsData(amount: number = 10, scheme: PreferenceType = 'light'): CardData[] {
    return Array.from({ length: amount }, (_, index): CardData => {
        
        const executedValue = Math.floor(Math.random() * 100); // Valor executado
        const plannedValue = executedValue + Math.floor(Math.random() * 50) + 1; // Valor planejado sempre maior

        const executedColor = Color_Generate.hex(scheme); // Gera uma cor aleatória
        const plannedColor = Color_Get.analogous(executedColor);

        return {
            id: (index + 1).toString(), // ID como string
            info: infos[Math.floor(Math.random() * infos.length)],
            executedColor, // Cor executada
            executedValue, // Valor executado
            plannedColor, // Cor planejada (complementar)
            plannedValue, // Valor planejado
        };
    });
}