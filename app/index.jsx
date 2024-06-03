import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../component/CustomButton';
import { Redirect, router } from 'expo-router';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className="justify center flex w-full items-center h-full px-4 top-10">
        <Image 
        source={images.logo} 
        className="w-[150px] h-[84px]"
        resizeMode='contain'
        />
        <Image
        source={images.cards}
        resizeMode='contain'
        className="w-[300px] h-[300px]"
        />
        <View className="relative mt-3 w-[300px]">
          <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities with <Text className="text-orange-300">Aora</Text></Text>
        </View>
        <View className="relative mt-9 w-[300px]">
          <Text className="text-xl text-gray-100 font-medium text-center">Signup for free and explore the world of creative minds</Text>
        </View>
        <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-10"
          />
      </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}


