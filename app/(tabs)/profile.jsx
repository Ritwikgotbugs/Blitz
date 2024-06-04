import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import CustomButton from '../../component/CustomButton'
import { signOut } from '../../lib/appwrite'

const Profile = () => {
  const logout= () => {
    signOut();
    router.replace("/sign-in");
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View className="w-full justify-end items-end flex-end">
        <TouchableOpacity onPress={logout}>
          <Image source={icons.logout} className="w-6 h-6 mx-5 my-4" />
        </TouchableOpacity>
        </View>
        <View>
          <Image 
          source={images.profile} className="w-[100px] h-[100px] rounded-full mx-auto my-5" resizeMode='contain' />
          <Text className="text-white text-2xl font-bold text-center">Ritwik Sharma</Text>
        </View>
        <View className="items-center justify-center flex-row mt-3">
          <View className="flex-column items-center mr-5">
            <Text className="font-bold text-white text-2xl">10</Text>
            <Text className="text-gray-100 text-l">Posts</Text>
          </View>
          <View className="items-center ml-5">
            <Text className="font-bold text-white text-2xl">12.3k</Text>
            <Text className="text-gray-100 text-l">Views</Text>
          </View>
        </View>
        <Image source={images.empty} className="items-center justify-center w-full h-[200px]" resizeMode='contain' />
        <Text className="text-gray-100 text-xl font-bold text-center">This profile has no posts yet!</Text>
        <View style={{ marginBottom: 16 }}>
          <CustomButton
            title="Create a Post"
            handlePress={() => router.push("/create")}
            containerStyles="w-[90%] justify-center mt-5 items-center mx-auto flex-row"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile