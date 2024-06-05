import { router } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyList from '../../components/EmptyList'
import { icons, images } from '../../constants'
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
       <EmptyList
        title={"No posts found"}
       />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile