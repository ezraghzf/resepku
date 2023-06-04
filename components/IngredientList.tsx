import { View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { RecipeIngredients } from "../services/RecipeService";

type Props = {
  index: number;
  resep: RecipeIngredients;
  selectedIngredient: number;
  setSelectedIngredient: React.Dispatch<React.SetStateAction<number>>;
};
export default function (props: Props) {
  const { index, resep, selectedIngredient, setSelectedIngredient } = props;
  return (
    <TouchableRipple
      key={resep.id}
      onPress={() =>
        index != selectedIngredient
          ? setSelectedIngredient(index)
          : setSelectedIngredient(-1)
      }
    >
      <Surface>
        <Text>
          {resep.amount} {resep.unit}
        </Text>
        <Text> {resep.name}</Text>
      </Surface>
    </TouchableRipple>
  );
}
