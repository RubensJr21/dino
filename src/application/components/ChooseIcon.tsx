// https://pictogrammers.com/library/mdi/
// import ChooseIcon from "@expo/vector-icons/MaterialCommunityIcons";
// export type NamesIconsChooseIcon = keyof typeof ChooseIcon.glyphMap;

import createIconSet from "@expo/vector-icons/build/createIconSet";
// @ts-ignore
import font from "@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf";
import glyph_map from "@react-native-vector-icons/material-design-icons/glyphmaps/MaterialDesignIcons.json";

export const MdiIcons = createIconSet(glyph_map, "material-design-icons", font);
export type MdiNamesIcon = keyof typeof MdiIcons.glyphMap;
// export default ChooseIcon;
