import { useIsFocused, RouteProp } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { StackNavigatorParamList } from "./types";
import { Recipe, getRecipe } from "../services/RecipeService";
type Props = {
  route: RouteProp<StackNavigatorParamList, "RecipeDetails">;
};
export const RecipeDetails = (props: Props) => {
  const theme = useTheme();
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  async function getRecipeDetails() {
    const recipeData = await getRecipe(props.route.params.id);
    console.log(recipeData);
    setRecipeData(recipeData);
  }
  useEffect(() => {
    getRecipeDetails();
    setLoading(false);
  }, [props.route.params.id]);

  return (
    recipeData && (
      <ScrollView style={{ backgroundColor: theme.colors.surfaceVariant }}>
        <View style={{ margin: 16 }}>
          <Image
            source={{ uri: recipeData.data.image }}
            style={style.recipeImage}
          />
        </View>

        <View
          style={[
            style.recipeDetails,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <View>
            <Text variant="headlineMedium">{recipeData.data.name}</Text>
            <Text variant="bodyLarge">{recipeData.data.description}</Text>
          </View>

          <View style={{ backgroundColor: theme.colors.surface }}>
            <Text variant="titleLarge">Ingredients</Text>
            {recipeData.ingredients.map((ing) => (
              <Text>{`${ing.amount} ${ing.name}`}</Text>
            ))}
          </View>
          <View style={{ backgroundColor: theme.colors.surface }}>
            <Text variant="titleLarge">Steps</Text>
            {recipeData.steps.map((step) => (
              <Text key={step.id}>{`${step.description}`}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  );
};

const style = StyleSheet.create({
  recipeImage: {
    width: "100%",

    borderRadius: 16,
    aspectRatio: 16 / 9,
  },
  recipeDetails: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    rowGap: 16,
  },
});
