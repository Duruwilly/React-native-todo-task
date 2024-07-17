import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
} from "../../store/reducers/todo-reducers";
import { useNavigation } from "@react-navigation/native";

type cardItemPropsType = {
  title: string;
  id: string;
  isLastItem: boolean;
};

const CardItem = ({ title, id, isLastItem }: cardItemPropsType) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => dispatch(deleteTodo({ todoId: id })),
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate("create-todo", {
      todoId: id,
    });
  };

  const { width } = useWindowDimensions();

  // sizes for different screen width
  const fontSize = width < 450 ? 18 : 22;

  return (
    <View style={[styles.cardContent, !isLastItem && styles.borderBottom]}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() =>
        navigation.navigate("todo-details", { todoId: id })
        }
      >
        <Text
          style={[
            styles.cardText,
            { fontSize },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          backgroundColor: "red",
          borderRadius: 9999,
          height: 28,
          width: 28,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <MaterialIcons name="delete" size={16} color="white" />
      </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <FontAwesome name="pencil-square-o" size={25} color="black" />
        </TouchableOpacity>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 18,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  cardText: {
    fontWeight: "600",
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
  },
  iconContainer: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    borderRadius: 5,
  },
  timeText: {
    fontWeight: "500",
    color: "#969697",
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    opacity: 0.25,
  },
  onCheckTextOpacity: {
    opacity: 0.5,
  },
});
