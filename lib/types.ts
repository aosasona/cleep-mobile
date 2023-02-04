import { NavigationProp, Route } from "@react-navigation/native";

export interface ScreenProps {
  navigation: NavigationProp<any>;
  route: Route<any>;
}

type CleepType = "text" | "file";

export interface Cleep {
  id: string;
  content: string;
  type: CleepType;
  session_id: string;
  created_at: string;
  updated_at: string;
}
