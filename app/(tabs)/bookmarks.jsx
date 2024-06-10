import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
const Bookmarks = () => {



  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-4">
        <Text className="text-white text-3xl font-bold text-center mt-5">Bookmarks</Text>
        <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 mt-3 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base text-white flex-1 font-pregular"
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity>
        <View className="bg-black w-7 h-7 items-center justify-center rounded-3xl">
        <Image source={icons.search} className="w-3 h-3" resizeMode="contain" />
        </View>
      </TouchableOpacity>
    </View>
      </View>
    </SafeAreaView>
  )
}

export default Bookmarks