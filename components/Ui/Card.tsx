import { FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { todoType } from "../../common.type";
import CardItem from "./CardItem";

type CardProps = {
  backgroundColor?: string;
  position?: "absolute" | "relative";
  top?: number;
  data: todoType;
  textOnEmptyData: string;
};

const Card = ({
  backgroundColor = "white",
  position,
  top,
  data,
  textOnEmptyData,
}: CardProps) => {

  const { height} = useWindowDimensions();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
          height: height - 300,
          position: position === "absolute" ? "absolute" : "relative",
          top: position === "absolute" ? top : undefined,
        },
      ]}
    >
      <FlatList
        data={data}
        renderItem={(itemData) => {
          return (
            <CardItem
              title={itemData.item.title}
              id={itemData.item.id}
              isLastItem={itemData.index === data.length - 1}
            />
          );
        }}
        alwaysBounceVertical={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text>{textOnEmptyData}</Text>
        )}
      />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 17,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
});
