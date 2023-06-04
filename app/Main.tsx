import { Text, useTheme } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "./HomeTabs";
import { RecipeDetails } from "./RecipeDetails";
import CreateEditRecipe from "./CreateEditRecipe";

const Stack = createStackNavigator();

export default function Main() {
  const theme = useTheme();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen name="CreateEditRecipe" component={CreateEditRecipe} />
    </Stack.Navigator>
  );
}
