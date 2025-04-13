import { Route, Router, UnknownOutputParams } from "expo-router";

export const carryingHandleNextPage = <T extends UnknownOutputParams>(
	pathLink: Route,
	router: Router
): FunctionNavigateTo<T> => {
	return (params?: T) => {
		router.navigate({
			pathname: pathLink,
			params,
		});
	};
};

export type FunctionNavigateTo<T> = (params?: T) => void;
