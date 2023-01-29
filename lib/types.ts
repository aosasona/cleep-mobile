import { NavigationProp, Route } from "@react-navigation/native";

export interface ScreenProps {
  navigation: NavigationProp<any>;
  route: Route<any>;
}
