import { View, ScrollView,Image,Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Signup = () => {
  const {setUser,setIsLogged }= useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);


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
          <Text className="text-3xl text-white font-bold text-center">Sign In to Blitz</Text>
          

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="default"
            placeholder={"Enter your Username"}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-3"
            keyboardType="email-address"
            placeholder={"Enter your email"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
            placeholder={"Enter your password"}
          />

          <CustomButton
            title="Sign Up"
            handlePress= {submit}
            containerStyles="w-full mt-8"
            isLoading={isSubmitting}
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