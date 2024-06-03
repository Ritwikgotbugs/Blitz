import { View, Text, Image, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../component/FormField'

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
    <ScrollView>
    <View className="flex w-full h-[80px] mt-3">
        <View className="flex-row w-full justify-between items-center my-3">
          <View className="flex-column items-start justify-center h-full mx-5">
            <Text className="text-gray-100 text-xl">Welcome Back!</Text>
            <Text className="text-white text-4xl font-bold ">User</Text>
          </View>
          <Image source={images.profile} className="w-[50px] h-[50px] rounded-full mx-3" resizeMode='contain'/>
        </View>
      </View>
      <FormField 
        title=""
        placeholder="Search for anything"
        keyboardType="default"
        otherStyles="mx-3"
      />

    </ScrollView>
    </SafeAreaView>
  )
}

export default Home