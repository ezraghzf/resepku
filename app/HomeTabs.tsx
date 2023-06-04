import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RecipeList from "./RecipeList";
import ShoppingList from "./ShoppingList";
import { FAB, Portal, useTheme, MD3TypescaleKey } from "react-native-paper";
import {
  useIsFocused,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "./types";

const Tab = createMaterialBottomTabNavigator();
export default function HomeScreen() {
  const safeArea = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator shifting={true}>
        <Tab.Screen
          name="Recipes"
          component={RecipeList}
          options={{
            tabBarIcon: "format-list-bulleted",
          }}
        />
        <Tab.Screen
          name="Shopping List"
          component={ShoppingList}
          options={{
            tabBarIcon: "basket-outline",
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon="plus"
          style={{
            position: "absolute",
            bottom: safeArea.bottom + 100,
            right: 16,
          }}
          theme={{
            colors: {
              accent: theme.colors.secondary,
            },
          }}
          onPress={() => {
            navigation.navigate("CreateEditRecipe");
          }}
        />
      </Portal>
    </>
  );
}
