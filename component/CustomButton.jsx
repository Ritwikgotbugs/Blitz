import { ActivityIndicator, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.6}
      className={`bg-secondary rounded-2xl min-h-[50px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-bold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}

      {title === "Create a Post" && (
        <Image source={icons.plus} style={{ tintColor: "black" }} className="w-6 h-6 mx-3" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;