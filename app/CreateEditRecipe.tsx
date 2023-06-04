import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Image, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Text, Button, TextInput, Snackbar, Portal } from "react-native-paper";
import React, { useEffect, useState } from "react";
import {
  Recipe,
  RecipeData,
  RecipeIngredients,
  RecipeSteps,
  addNewRecipe,
} from "../services/RecipeService";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import AddNewIngredient from "../components/CreateEditRecipe/AddNewIngredient";
// import SortableListBar from "../components/CreateEditRecipe/SortableListBar";
import { arrayMoveImmutable } from "array-move";
import IngredientList from "../components/IngredientList";
import FormTitle from "../components/CreateEditRecipe/FormHeading";
import AddNewStep from "../components/CreateEditRecipe/AddNewStep";
import StepsList from "../components/CreateEditRecipe/StepsList";
import { StackNavigatorParamList } from "./types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  route: RouteProp<StackNavigatorParamList, "CreateEditRecipe">;
  navigation: StackNavigationProp<StackNavigatorParamList>;
};
export default function CreateEditRecipe(props: Props) {
  const [newResep, setNewResep] = useState<RecipeData>({
    id: uuid.v4().toString(),
    name: "",
    image: null,
    description: "",
  });
  const [newIngredients, setNewIngredients] = useState<RecipeIngredients[]>([]);
  const [newSteps, setNewSteps] = useState<RecipeSteps[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<number>(-1);
  const [selectedStep, setSelectedStep] = useState<number>(-1);
  const [editMode, setEditMode] = useState(false);

  function addNewIngredient(ingredient: RecipeIngredients) {
    setNewIngredients((oldResep) => {
      return [...oldResep, ingredient];
    });
  }
  function addNewStep(step: RecipeSteps) {
    setNewSteps((oldStep) => {
      return [...oldStep, step];
    });
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
    });
    // TODO: if there is an old image, delete the last one
    if (!result.canceled) {
      setNewResep((oldResep) => ({
        ...oldResep,
        image: result.assets != null ? result.assets[0].uri : null,
      }));
    }
  };
  function moveItemDown<Type>(
    itemArray: Type[],
    setItemarray: React.Dispatch<React.SetStateAction<Type[]>>,
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  ) {
    if (selectedIndex == itemArray.length - 1) {
      return;
    }
    setItemarray((oldItems: Type[]) => {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      return arrayMoveImmutable(oldItems, selectedIndex, newIndex);
    });
  }
  function moveItemUp<Type>(
    itemArray: Type[],
    setItemarray: React.Dispatch<React.SetStateAction<Type[]>>,
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  ) {
    if (selectedIndex == 0) {
      return;
    }
    setItemarray((oldItems: Type[]) => {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      return arrayMoveImmutable(oldItems, selectedIndex, newIndex);
    });
  }
  async function addRecipe() {
    const inputRecipe: Recipe = {
      data: newResep,
      ingredients: newIngredients,
      steps: newSteps,
    };
    console.log(inputRecipe);
    await addNewRecipe(inputRecipe).then(() => {
      props.navigation.push("Home");
    });
  }
  useEffect(() => {
    selectedIngredient >= 0 && setSelectedStep(-1);
    console.log(`${selectedIngredient} ${selectedStep}`);
  }, [selectedIngredient]);
  useEffect(() => {
    selectedStep >= 0 && setSelectedIngredient(-1);
    console.log(`${selectedIngredient} ${selectedStep}`);
  }, [selectedStep]);

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    /* {selectedIngredient >= 0 && (
        <SortableListBar
          close={() => setSelectedIngredient(-1)}
          edit={() => {}}
          moveDown={() =>
            moveItemDown(
              newIngredients,
              setNewIngredients,
              selectedIngredient,
              setSelectedIngredient
            )
          }
          moveUp={() =>
            moveItemUp(
              newIngredients,
              setNewIngredients,
              selectedIngredient,
              setSelectedIngredient
            )
          }
        />
      )}
      {selectedStep >= 0 && (
        <SortableListBar
          close={() => setSelectedStep(-1)}
          edit={() => {}}
          moveDown={() =>
            moveItemDown(newSteps, setNewSteps, selectedStep, setSelectedStep)
          }
          moveUp={() =>
            moveItemUp(newSteps, setNewSteps, selectedStep, setSelectedStep)
          }
        />
      )} */
    <Portal.Host>
      <ScrollView style={style.container}>
        <View>
          {/* <AspectRatio w="100%" ratio={16 / 9}>
            {newResep.image ? (
              <Image source={{ uri: newResep.image }} alt="image" />
            ) : (
              <ZStack
                bg="gray.400"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Button onPress={pickImage}>Tambah Gambar</Button>
              </ZStack>
            )}
          </AspectRatio> */}
        </View>
        <View>
          <View>
            <FormTitle text="Nama Resep" />
            <TextInput
              placeholder="cth: Nasi Goreng"
              onChangeText={(value) =>
                setNewResep((prev) => ({ ...prev, name: value }))
              }
              value={newResep.name}
            />
            <FormTitle text="Deskripsi" />
            <TextInput
              placeholder="cth: Resep ini dari ibu"
              onChangeText={(value) =>
                setNewResep((prev) => ({ ...prev, description: value }))
              }
              value={newResep.description}
            />
            <FormTitle text="Bahan Makanan" />

            {newIngredients.length > 0 ? (
              newIngredients.map((resep, ingredientIndex) => {
                return (
                  <IngredientList
                    index={ingredientIndex}
                    resep={resep}
                    selectedIngredient={selectedIngredient}
                    setSelectedIngredient={setSelectedIngredient}
                    key={resep.id}
                  />
                );
              })
            ) : (
              <Text>Tambah bahan baru</Text>
            )}

            <AddNewIngredient addNewIngredient={addNewIngredient} />
            <FormTitle text="Cara Memasak" />
            {/* {newSteps.length > 0 ? (
              newSteps.map((step, stepsIndex) => {
                return (
                  <StepsList
                    index={stepsIndex}
                    step={step}
                    selectedSteps={selectedStep}
                    setSelectedSteps={setSelectedStep}
                    key={step.id}
                  />
                );
              })
            ) : (
              <View>Tambah langkah baru</View>
            )}
            <AddNewStep addNewStep={addNewStep} /> */}
            <View />
            <Button mode="contained" onPress={() => addRecipe()}>
              Tambah Resep
            </Button>
          </View>
        </View>
      </ScrollView>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        Resep berhasil ditambah
      </Snackbar>
    </Portal.Host>

    // </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
