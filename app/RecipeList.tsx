import { useTheme } from "react-native-paper";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { RecipeData, getAllRecipe } from "../services/RecipeService";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "./types";
import { CARD_GAP, CardProps, RecipeCard } from "../components/RecipeCard";

type Props = {
  navigation?: StackNavigationProp<StackNavigatorParamList>;
};
export default function RecipeList(props: Props) {
  const [refresh, setRefresh] = useState(false);
  const [recipeList, setRecipeList] = useState<RecipeData[]>([]);
  const theme = useTheme();
  async function getRecipeFromStore() {
    const recipeList = await getAllRecipe();
    setRefresh(true);
    try {
      setRecipeList(recipeList);
      setRefresh(false);
    } catch (error) {
      setRefresh(false);
    }
    setRefresh(false);
  }

  useEffect(() => {
    getRecipeFromStore();
  }, []);

  const data = recipeList.map((recipe) => ({
    ...recipe,
    onPress: () => {
      props.navigation &&
        props.navigation.push("RecipeDetails", {
          id: recipe.id,
        });
    },
  }));
  return (
    <SafeAreaView style={styles.viewContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.surface },
        ]}
        numColumns={2}
        columnWrapperStyle={styles.cardColumn}
      ></FlatList>
    </SafeAreaView>
  );
}

function renderItem({ item }: { item: CardProps }) {
  return <RecipeCard {...item} />;
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  container: {
    padding: CARD_GAP,
    gap: CARD_GAP,
    paddingBottom: 100,
  },
  cardColumn: {
    gap: CARD_GAP,
  },
});
