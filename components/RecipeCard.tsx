import { Card } from "react-native-paper";
import { RecipeData } from "../services/RecipeService";
import { StyleSheet } from "react-native";

export type CardProps = RecipeData & {
  onPress: (id: string) => void;
};

export function RecipeCard(props: CardProps) {
  return (
    <Card style={styles.cardStyle} onPress={() => props.onPress(props.id)}>
      <Card.Cover source={{ uri: props.image }} />
      <Card.Title
        title={props.name || "Tanpa Nama"}
        subtitle={props.description || "Tanpa deskripsi"}
      />
    </Card>
  );
}

export const CARD_GAP = 12;
const styles = StyleSheet.create({
  cardStyle: {
    flex: 1 / 2,
  },
});
