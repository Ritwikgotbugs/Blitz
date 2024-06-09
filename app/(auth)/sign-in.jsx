import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import { images } from '../../constants'
import { LoginUser, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const {setUser,setIsLogged }= useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await LoginUser(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="justify-center flex items-center w-full mt-10 px-4">
          <Image source={images.logo} className="w-[150px] h-[80px] mt-10" resizeMode='contain'/>
          <Text className="text-3xl text-white font-bold text-center">Log In to Aora</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder={"Enter your email"}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder={"Enter your password"}
          />

          <CustomButton
            title="Log In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-8" 
           />          
        <Text className="text-white mt-4"
        >Don't have an account? {' '}
        <Link href="/sign-up" className="text-orange-300 font-bold">Sign Up!</Link></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn