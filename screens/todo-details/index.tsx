import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Colors } from "../../Constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../common.type";
import { RouteProp } from "@react-navigation/native";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "todo-details"
>;
type TodoRouteProp = RouteProp<RootStackParamList, "todo-details">;

type TodoDetailsProps = {
  navigation: NavigationProp;
  route: TodoRouteProp;
};

const TodoDetails = ({ route, navigation }: TodoDetailsProps) => {
  const { todos } = useSelector((state: RootState) => state.todoReducer);
  const todoId = route?.params?.todoId;
  const todoItem = todos.find((item) => item.id === todoId);
  const { width } = useWindowDimensions();

  const fontSize = width < 450 ? 18 : 26;
  const leftFontSize = width < 450 ? 24 : 28;
  const leftFontSizeBackground = width < 450 ? 40 : 56;
  const headerHeight = width < 450 ? 100 : 120;

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.header, { height: headerHeight }]}>
        <View style={styles.headerContent}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={[
              styles.leftIcon,
              { height: leftFontSizeBackground, width: leftFontSizeBackground },
            ]}
          >
            <MaterialIcons
              name="chevron-left"
              size={leftFontSize}
              color="black"
            />
          </Pressable>
          <Text style={[styles.headerText, { fontSize }]}>Todo Details</Text>
        </View>
        <View style={styles.stripeBelow}></View>
        <View style={styles.stripeTop}></View>
      </View>
      <ScrollView style={styles.screen} alwaysBounceVertical={false}>
        <View style={{ padding: 20 }}>
          <Text style={styles.titleText}>{todoItem?.title}</Text>
          <Text style={styles.description}>
            {todoItem?.description ?? "No Description provided"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TodoDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    position: "relative",
  },
  header: {
    backgroundColor: Colors.primary800,
    width: "100%",
    height: 100,
    position: "relative",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  leftIcon: {
    backgroundColor: "white",
    borderRadius: 9999,
    left: 0,
    marginLeft: 9,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  stripeBelow: {
    position: "absolute",
    bottom: 0,
    left: -120,
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
    right: -60,
    backgroundColor: "transparent",
    borderRadius: 9999,
    borderWidth: 20,
    borderColor: Colors.primary500,
    height: 100,
    width: 100,
    zIndex: -99,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16
  }
});
