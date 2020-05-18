import { createSwitchNavigator } from "react-navigation";

import { getRouteTitle } from "./routes";
import {HomeScreen} from "@screens/HomeScreen";
import {SwipeScreen} from "@screens/SwipeScreen";
import {createStackNavigator} from "react-navigation-stack";
import {getDefaultNavigationOptions} from "@navigation/utils/defaultNavigationOptions";
import { WaitingScreen } from "@screens/WaitingScreen";
import { TimesUpScreen } from "@screens/TimesUpScreen";
import { ResultsScreen } from "@screens/ResultsScreen";

// Stack navigators are useful for when you want the user to go back.. like swiping through pages. For example the setup
const SetupStackNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
  },
  {
    initialRouteName: "HomeScreen",
    defaultNavigationOptions: ({ navigation }) => getDefaultNavigationOptions(navigation),
    headerMode: "screen",
  }
);

// Switch navigators are used for when you don't want the user to go back
export const AuthSwitchNavigator = createSwitchNavigator(
  {
      HomeScreen: SetupStackNavigator,
      SwipeScreen: SwipeScreen,
      WaitingScreen: WaitingScreen,
      TimesUpScreen: TimesUpScreen,
      ResultsScreen: ResultsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: getRouteTitle(navigation.state.routeName),
    }),
  }
);
