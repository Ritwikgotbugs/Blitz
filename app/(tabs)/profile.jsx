import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <View className="h-full bg-primary items-center justify-center flex h-full w-full">
      <Link href="/sign-in" className='text-red-500 text-2xl font-bold '>Log out</Link>
    </View>
  )
}

export default Profile