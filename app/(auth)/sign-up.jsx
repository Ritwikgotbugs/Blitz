import { View, ScrollView,Image,Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../component/FormField'
import CustomButton from '../../component/CustomButton'
import { Link } from 'expo-router'

const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="justify-center flex items-center w-full">
          <Image source={images.logo} className="w-[150px] h-[80px] mt-10" resizeMode='contain'/>
          <Text className="text-3xl text-white font-bold text-center">Sign In to Aora</Text>
          

          <FormField
            title="Username"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7 mx-3"
            keyboardType="email-address"
            placeholder={"Enter your Username"}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-3 mx-3"
            keyboardType="email-address"
            placeholder={"Enter your email"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3 mx-3"
            placeholder={"Enter your password"}
          />

          <CustomButton
            title="Sign Up"
            handlePress={() => {}}
            containerStyles="w-[90%] mt-8"
          />
          <Text className="text-white mt-4"
        >Already a user? {' '}
        <Link href="/sign-in" className="text-orange-300 font-bold">Login!</Link></Text>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup