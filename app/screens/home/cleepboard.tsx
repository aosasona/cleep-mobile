import {ScrollView} from "native-base";
import CustomSafeAreaView from "../../../components/custom/CustomSafeAreaView";
import {ScreenProps} from "../../../lib/types";

export default function Cleepboard({navigation, route}: ScreenProps) {
    return (
      <CustomSafeAreaView>
          <ScrollView></ScrollView>
      </CustomSafeAreaView>
    );
}