import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import useAppwrite from '../lib/useAppwrite'
import { getPosts } from '../lib/appwrite'
import SearchInput from './Search'
import {useGlobalContext} from '../context/GlobalProvider';


const Header = () => {
    const {user} = useGlobalContext();

    const {data: items} = useAppwrite(getPosts)
    const goToProfile=()=> {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        router.push("/profile");
    
      }
  return (
    <>
    <View className="flex-row w-full justify-between items-center mb-0 ">
          <View className="flex-column items-start justify-center mx-5">
            <Text className="text-gray-100 text-xl">Welcome Back!</Text>
            <Text className="text-white text-3xl font-bold ">{user?.username}</Text>
          </View>

          <TouchableOpacity onPress={goToProfile} className="px-5">
          <Image 
          source={{uri: user?.avatar}} 
          className="w-[50px] h-[50px] rounded-full mx-auto my-3" 
          resizeMode='contain' />
          </TouchableOpacity>
          

        </View>
        <SearchInput/>
       <Text className="text-gray-100 font-regular text-xl px-5 mt-5 mb-5">Latest Posts</Text>

      </>
  )
}

export default Header