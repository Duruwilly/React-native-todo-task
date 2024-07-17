import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import FormLabel from "../../components/Common/FormLabel";
import PrimaryButton from "../../components/Common/PrimaryButton";
import { Colors } from "../../Constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../../store/reducers/todo-reducers";
import { RootStackParamList} from "../../common.type";
import { MaterialIcons } from "@expo/vector-icons";
import { RootState } from "../../store/store";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "todo-details"
>;
type TodoRouteProp = RouteProp<RootStackParamList, "todo-details">;

type TodoDetailsProps = {
  navigation: NavigationProp;
  route: TodoRouteProp;
};

const CreateTodo = ({ navigation, route }: TodoDetailsProps) => {
  const dispatch = useDispatch();
  const { todos } = useSelector(
    (state: RootState) => state.todoReducer
  );

  const todoId = route?.params?.todoId;
  const isEditing = !!todoId;
  const todoItem =
    todos.find((item) => item.id === todoId)

  const { width } = useWindowDimensions();

  const [todosInputState, setTodosInputState] = useState({
    title: isEditing ? todoItem?.title ?? "" : "",
    description: isEditing ? todoItem?.description ?? "" : "",
    id: isEditing
      ? todoItem?.id ?? ""
      : Math.floor(Math.random() * 10000).toString(),
  });

  const [emptyInputCheck, setEmptyInputCheck] = useState<boolean>(false);

  useEffect(() => {
    if (emptyInputCheck) {
      const timer = setTimeout(() => setEmptyInputCheck(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [emptyInputCheck]);

  const handleSave = () => {
    if (todosInputState.title.trim() === "") {
      setEmptyInputCheck(true);
      return;
    }
    if (isEditing) {
      dispatch(updateTodo(todosInputState));
    } else {
      dispatch(addTodo([todosInputState]));
    }
    navigation.navigate("todo-list");
  };

  // sizes for different screen width
  const fontSize = width < 450 ? 18 : 26;
  const leftFontSize = width < 450 ? 24 : 28;
  const leftFontSizeBackground = width < 450 ? 40 : 56;
  const headerHeight = width < 450 ? 100 : 120;

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.header, { height: headerHeight }]}>
        <View style={styles.headerContent}>
          <Pressable
            onPress={() => navigation.navigate("todo-list")}
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
          <Text style={[styles.headerText, { fontSize }]}>Add New todo</Text>
        </View>
        <View style={styles.stripeBelow}></View>
        <View style={styles.stripeTop}></View>
      </View>
      <ScrollView style={styles.screen} alwaysBounceVertical={false}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.contentContainer}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <FormLabel title="Title(required)" />
              <TextInput
                style={styles.formInput}
                value={todosInputState.title}
                onChangeText={(value) =>
                  setTodosInputState((state) => {
                    return { ...state, title: value };
                  })
                }
                placeholder="Pick up the milk"
                placeholderTextColor={"black"}
              />
            </View>
            {/* description */}
            <View
              style={[
                styles.contentItem,
                {
                  width: "100%",
                  maxWidth: 500,
                  alignSelf: "center",
                },
              ]}
            >
              <FormLabel title="Description" />
              <TextInput
                multiline={true}
                numberOfLines={9}
                style={styles.textInput}
                placeholder="Description"
                placeholderTextColor={"black"}
                value={todosInputState.description}
                onChangeText={(value) =>
                  setTodosInputState((state) => {
                    return { ...state, description: value };
                  })
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        {/* warning */}
        {emptyInputCheck && (
          <Text style={[styles.warningText, { fontSize }]}>
            The title field is required!
          </Text>
        )}
      </ScrollView>
      <PrimaryButton onPress={handleSave}>Save</PrimaryButton>
    </View>
  );
};

export default CreateTodo;

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
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 65,
    marginTop: 20,
  },
  contentItem: {
    marginTop: 20,
  },
  titleContainer: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  formInput: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    height: 55,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(209, 213, 219)",
    backgroundColor: "white",
    borderRadius: 6,
  },
  textInput: {
    borderColor: "rgb(209, 213, 219)",
    borderWidth: 1,
    padding: 14,
    backgroundColor: "white",
    borderRadius: 6,
    height: 180,
    ...Platform.select({
      ios: {
        paddingTop: 14,
      },
      android: {
        textAlignVertical: "top",
      },
    }),
  },
  warningText: {
    backgroundColor: Colors.primary300,
    width: "50%",
    paddingVertical: 12,
    fontWeight: "600",
    alignSelf: "center",
    textAlign: "center",
    color: Colors.primary600,
  },
});
