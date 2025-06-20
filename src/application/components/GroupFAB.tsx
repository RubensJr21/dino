import { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { MdiNamesIcon } from "./ChooseIcon";

interface GroupFabAction {
	icon: MdiNamesIcon;
	label: string;
	onPress: () => void;
}

interface GroupFABProps {
	actions: GroupFabAction[];
  style?: StyleProp<ViewStyle>;
}

export default function GroupFAB({ actions, style }: GroupFABProps) {
	const [state, setState] = useState<{ open: boolean }>({ open: false });

	const onStateChange = ({ open }: { open: boolean }) => setState({ open });

	const { open } = state;

	return (
			<Portal>
				<FAB.Group
					open={open}
					visible
          style={style}
					icon={open ? "close" : "menu"}
					actions={actions}
					onStateChange={onStateChange}
					onPress={() => {
						if (open) {
							// do something if the speed dial is open
						}
					}}
				/>
			</Portal>
	);
}
