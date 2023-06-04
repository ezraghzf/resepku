import { Pressable, Box, Text, Stack } from "native-base";
import { RecipeSteps } from "../../services/RecipeService";

type Props = {
  index: number;
  step: RecipeSteps;
  selectedSteps: number;
  setSelectedSteps: React.Dispatch<React.SetStateAction<number>>;
};
export default function (props: Props) {
  const { index, step, selectedSteps, setSelectedSteps } = props;
  return (
    <Pressable
      onPress={() =>
        index != selectedSteps ? setSelectedSteps(index) : setSelectedSteps(-1)
      }
    >
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            borderWidth={"1"}
            p="3"
            rounded={"lg"}
            shadow="0"
            borderColor={index == selectedSteps ? "primary.600" : "gray.100"}
            bg={
              isPressed
                ? "coolGray.200"
                : isHovered
                ? "coolGray.200"
                : index == selectedSteps
                ? "primary.100"
                : "white"
            }
          >
            {
              <Stack direction={"row"}>
                <Text fontWeight={"bold"}>{index + 1}. </Text>
                <Text> {step.description}</Text>
              </Stack>
            }
          </Box>
        );
      }}
    </Pressable>
  );
}
