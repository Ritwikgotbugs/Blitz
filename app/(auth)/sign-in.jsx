import { View, ScrollView,Image,Text} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../component/FormField'
import CustomButton from '../../component/CustomButton'
import { Link, router } from 'expo-router'
import { LoginUser } from '../../lib/appwrite'
import { Alert } from 'react-native'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await LoginUser(form.email, form.password);

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