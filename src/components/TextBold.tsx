import { Text } from "react-native-paper";

export function TextBold({ children }: { children: React.ReactNode }) {
	return <Text style={{ fontWeight: "bold" }}>{children}</Text>;
}
