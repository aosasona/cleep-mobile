import { Text } from "native-base";

interface Props {
  children: string;
}

export default function CustomHeaderTitle({ children }: Props) {
  return <Text>{children}</Text>;
}
