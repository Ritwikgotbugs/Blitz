import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const EmptyList = ({title,subtitle}) => {
  return (
    <View className="items-center justify-center px-4 flex">
      <Image className="w-[270px] h-[200px] items-center justify-center mb-5" source={images.empty} resizeMode='cover'/>
      <Text className="text-white font-bold text-2xl">{title}</Text>
      <Text className="text-gray-100 font-semibold text-l">{subtitle}</Text>

    </View>

  )
}

export default EmptyList