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
      

      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      ): (
        <Text className={`text-primary font-bold text-lg ${textStyles}`}>
        {title}
      </Text>
      )}

    </TouchableOpacity>
  );
};

export default CustomButton;