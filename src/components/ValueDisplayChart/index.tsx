import { CSSProperties } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import Legend from "./Legend";

import { truncateDecimals } from "@/lib/math";

interface ValueDisplayChartProps {
    executedColor: NonNullable<CSSProperties['color']>,
    executedValue: number
    plannedColor: NonNullable<CSSProperties['color']>,
    plannedValue: number
    
}

export default function ValueDisplayChart({executedColor = "#00e0ff", plannedColor = "#3d5875", executedValue, plannedValue}: ValueDisplayChartProps){
    return (
        <View style={{justifyContent: "center", rowGap: 10}}>
            <AnimatedCircularProgress
                size={90}
                prefill={0}
                rotation={0}
                width={12}
                fill={(executedValue / plannedValue) * 100}
                duration={2_000}
                tintColor={executedColor}
                tintTransparency={false}
                // transparência de B0 adicionado ao final da string
                backgroundColor={`${plannedColor}B0`}
                style={{alignSelf: "center"}}
            >
                {(fill) => <Text>{ truncateDecimals(fill, 0) } %</Text>}
            </AnimatedCircularProgress>
            <Legend {...{executedColor, executedValue, plannedColor, plannedValue }}/>
        </View>
    )
}