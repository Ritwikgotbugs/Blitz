import { View, Text,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { images } from '../constants'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import FormField from './FormField'
const Header = () => {

    const goToProfile=()=> {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        router.push("/profile");
    
      }
    
  return (
    <>
    <View className="flex-row w-full justify-between items-center my-3 mb-0">
          <View className="flex-column items-start justify-center mx-5 mt-5">
            <Text className="text-gray-100 text-xl">Welcome Back!</Text>
            <Text className="text-white text-4xl font-bold ">User</Text>
          </View>

          <TouchableOpacity onPress={goToProfile} className="px-5">
          <Image 
          source={images.profile} 
          className="w-[50px] h-[50px] rounded-full mx-auto my-3" 
          resizeMode='contain' />
          </TouchableOpacity>
          

        </View>
        <FormField 
        title=""
        placeholder="Search for anything"
        keyboardType="default"
        otherStyles="mx-4"
      />
      </>
  )
}

export default Header