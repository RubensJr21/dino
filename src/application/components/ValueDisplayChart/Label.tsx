import { CSSProperties } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { truncateDecimals } from "@application/lib/math";

import Square from "./Square";

interface LabelProps {
    caption: string
    sizeLabelItems?: number,
    squareColor: NonNullable<CSSProperties['color']>,
    value: number
}


export default function Label({caption, sizeLabelItems = 16, squareColor, value}: LabelProps) {
    const textProps = {
        adjustsFontSizeToFit: true,
        numberOfLines: 1,
        style:[label_styles.caption, {lineHeight: sizeLabelItems}]
    }

    return (
        <View>
            <Text
                style={[
                    label_styles.caption_text_value,
                    {
                        color: squareColor
                    }
                ]}
            >R$ {truncateDecimals(value, 2)}</Text>
            <View style={label_styles.container}>
                <Square color={squareColor} size={sizeLabelItems}/>
                <Text {...textProps} >{caption}</Text>
            </View>
        </View>
    )
}

const label_styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: 25,
        alignItems: 'center',
        columnGap: 3
    },
    caption: {
        textAlignVertical: 'center',
        fontSize: 13
    },
    caption_text_value: {
        fontWeight: 'bold',
        textShadowOffset: {width: 1.75, height: 1.75},
        textShadowRadius:.9,
    }
})