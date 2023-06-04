import uuid from "react-native-uuid";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RecipeIngredients } from "../../services/RecipeService";
import { FontAwesome } from "@expo/vector-icons";
import FormTitle from "./FormHeading";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, Portal, TextInput, useTheme } from "react-native-paper";

export default function AddNewIngredient(props: { addNewIngredient: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState<RecipeIngredients>({
    id: uuid.v4().toString(),
    amount: "",
    name: "",
    unit: "",
  });

  const units = ["kg", "gram", "mg", "sdm", "sdt", "buah", "liter", "ml"];
  const jumlahRef = useRef<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "90%"], []);
  // useEffect(() => {
  //   setNewIngredient({
  //     id: uuid.v4().toString(),
  //     amount: "",
  //     name: "",
  //     unit: "",
  //   });
  // }, [isOpen]);

  function confirmIngredient() {
    props.addNewIngredient(newIngredient);
    bottomSheetRef.current?.close();
  }
  const theme = useTheme();
  return (
    <>
      <Button onPress={() => bottomSheetRef.current?.expand()}>
        Tambah bahan?
      </Button>
      <Portal>
        <BottomSheet
          backgroundStyle={[{ backgroundColor: theme.colors.surface }]}
          style={style.bottomSheet}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          index={1}
        >
          <BottomSheetView style={style.bottomSheetView}>
            <FormTitle text="Cara Memasak" />
            <TextInput
              onChangeText={(value) =>
                setNewIngredient((prev) => ({ ...prev, name: value }))
              }
              value={newIngredient.name}
              placeholder="Nama Bahan"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => jumlahRef.current.focus()}
            ></TextInput>
            <FormTitle text="Jumlah" />
            <TextInput
              keyboardType="numeric"
              onChangeText={(value) =>
                setNewIngredient((prev) => ({ ...prev, amount: value }))
              }
              value={newIngredient.amount}
              ref={jumlahRef}
              placeholder="Jumlah"
              right={<TextInput.Affix text={newIngredient.unit} />}
            ></TextInput>
            <FormTitle text="Ukuran Berat" />
            {/* <Select
            selectedValue={newIngredient.unit}
            minWidth="200"
            accessibilityLabel="Pilih ukuran berat"
            placeholder="Pilih ukuran berat"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(value) =>
              setNewIngredient((prev) => ({ ...prev, unit: value }))
            }
          >
            {units.map((unit) => {
              return <Select.Item key={unit} label={unit} value={unit} />;
            })}
          </Select> */}

            <Button mode="contained" icon="plus" onPress={confirmIngredient}>
              Tambah Bahan
            </Button>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
}

const style = StyleSheet.create({
  bottomSheet: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  bottomSheetView: {
    padding: 16,
  },
});
