import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { format } from "date-fns";
import { Colors } from "../../Constants/colors";
import Card from "../../components/Ui/Card";
import PrimaryButton from "../../components/Common/PrimaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { RootStackParamList } from "../../common.type";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "create-todo"
>;

type NavigationProps = {
  navigation: NavigationProp;
};

const Home = ({ navigation }: NavigationProps) => {
  const { todos } = useSelector(
    (state: RootState) => state.todoReducer
  );

  const switchScreen = () => {
    navigation.navigate("create-todo");
  };

  const { width } = useWindowDimensions();

  // sizes for different screen width
  const fontSize = width < 450 ? 30 : 100;
  const dateFontSize = width < 450 ? 18 : 25;

  return (
    <View style={styles.rootContainer}>
      <View>
        <View style={styles.header}>
          <Header fontSize={fontSize} dateFontSize={dateFontSize} />
          <View style={styles.cardContainer}>
              <Card
                position="absolute"
                top={30}
                data={todos}
                textOnEmptyData="Nice Job! You have no tasks to do or you have completed your tasks."
              />
          </View>
        </View>
      </View>
      <PrimaryButton onPress={switchScreen}>Add New Task</PrimaryButton>
    </View>
  );
};

const Header = ({
  fontSize,
  dateFontSize,
}: {
  fontSize: number;
  dateFontSize: number;
}) => (
  <View>
    <View style={styles.headerTextContainer}>
      <Text style={[styles.headerText, { fontSize: dateFontSize }]}>
        {format(new Date(), "MMMM dd, yyyy")}
      </Text>
      <Text
        style={[
          styles.headerText,
          { marginTop: 40, fontSize, fontWeight: "700" },
        ]}
      >
        My Todo List
      </Text>
    </View>
    <View style={styles.stripeBelow}></View>
    <View style={styles.stripeTop}></View>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: "relative",
  },
  header: {
    backgroundColor: Colors.primary800,
    width: "100%",
    height: 250,
    paddingTop: 60,
    position: "relative",
  },
  headerTextContainer: {
    marginBottom: 24,
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  stripeBelow: {
    position: "absolute",
    bottom: 0,
    left: -200,
    backgroundColor: "transparent",
    borderRadius: 9999,
    borderWidth: 50,
    borderColor: Colors.primary500,
    height: 300,
    width: 300,
    zIndex: -99,
  },
  stripeTop: {
    position: "absolute",
    top: 0,
    right: -80,
    backgroundColor: "transparent",
    borderRadius: 9999,
    borderWidth: 40,
    borderColor: Colors.primary500,
    height: 150,
    width: 150,
    zIndex: -99,
  },
  cardContainer: {
    paddingHorizontal: 18,
  },
});
