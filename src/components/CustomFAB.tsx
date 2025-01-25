import { useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { MdiNamesIcon } from "./ChooseIcon";

interface Custom_FabAction {
	icon: MdiNamesIcon;
	label: string;
	onPress: () => void;
}

interface Custom_FABProps {
	actions: Custom_FabAction[];
}

export default function Custom_FAB({ actions }: Custom_FABProps) {
	const [state, setState] = useState<{ open: boolean }>({ open: false });

	const onStateChange = ({ open }: { open: boolean }) => setState({ open });

	const { open } = state;

	return (
		<Portal.Host>
			<Portal>
				<FAB.Group
					open={open}
					visible
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
		</Portal.Host>
	);
}
