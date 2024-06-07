import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { icons } from "../constants";

const SearchInput = () => {
  const pathname= usePathname()
  const [query,setQuery]=useState('')

  return (
    <View className="px-4 mt-2">
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={()=> {
          if (!query) {
            return  Alert.alert("Please enter a search query")
          }

          if (pathname.startsWith("/search")) router.setParams({query})
          else router.push(`/search/${query}`)
        }}
      >
        <View className="bg-black w-7 h-7 items-center justify-center rounded-3xl">
        <Image source={icons.search} className="w-3 h-3" resizeMode="contain" />
        </View>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default SearchInput;
