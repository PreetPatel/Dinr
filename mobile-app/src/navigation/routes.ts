import * as R from "ramda";
import { SwipeScreenNavigationParams } from "@screens/SwipeScreen";

type RouteDefinition = {
  readonly title: string;
  readonly icon?: string;
  readonly headerShown?: boolean;
};

export type RouteName =
   "HomeScreen"
  | "SwipeScreen"
  | "SetupSessionScreen";

type Routes = {
  readonly [Name in RouteName]: RouteDefinition;
};

export const Routes: Routes = {
  HomeScreen: {
    title: "Home",
    headerShown: false,
  },
  SwipeScreen: {
    title: "Swipe Screen",
    headerShown: false,
  },
  SetupSessionScreen: {
    title: "Setup Session Screen",
    headerShown: false,
  }
};
/**
 * Maps a RouteName to a Navigation Param type
 */
export type NavigationParamsMap = {
  readonly SwipeScreen: SwipeScreenNavigationParams;
};

export const getRouteIcon = (route: string): string | undefined => R.path([route, "icon"], Routes);
export const getRouteTitle = (route: string): string | undefined => R.path([route, "title"], Routes);
export const getRouteHeaderShown = (route: string): boolean | undefined =>
  R.path<boolean>([route, "headerShown"], Routes) || false;
