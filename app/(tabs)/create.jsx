import {Alert, Text,TouchableOpacity,View} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import FormField from '../../components/FormField'
import { icons } from '../../constants'
import { Image } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { useState } from 'react'
import { ResizeMode } from 'expo-av'
import { Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createPost, createVideoPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import * as DocumentPicker from 'expo-document-picker'

const Create = () => {
  const {user}= useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [form, setForm]= useState({
    title:'',
    video:null,
    thumbnail:null
  })


  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
  };

  const submit= async ()=> {
    if (!form.title || !form.thumbnail || !form.video){
      return Alert.alert('Error', 'Please fill in all fields')
    }
    setUploading(true)
    try {

      await createVideoPost({
        ...form,userId: user.$id
      })

      
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {

      setUploading(false)
    }
  }

 


  return (
    <SafeAreaView className="h-full bg-primary">
    <ScrollView>
      <Text className="text-white text-3xl font-bold mx-4 mt-5 mb-7">Upload a video</Text>
      <FormField 
        title="Title"
        placeholder="Enter a title for your video..."
        keyboardType="default"
        otherStyles="mx-3"
        value={form.title}
        handleChangeText={(e) => setForm({ ...form, title: e })}  

      />
      <Text className="text-base text-gray-100 font-semibold mx-4 mt-10">Upload video</Text>
      <TouchableOpacity onPress={()=> openPicker('video')} className="px-3">
        {form.video? 
        (
            <Video
            source={{uri:form.video.uri}}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            className="w-full h-60 rounded-2xl mt-4"
            isLooping
            />
        ):
        (
          <View className="border-2 border-dashed border-gray-500 h-60 rounded-xl mt-2 items-center justify-center">
            <View className="items-center gap-y-2 pb-2 px-2 bg-black-200 rounded-2xl">
              <Image className="w-[30px] h-[30px]" source={icons.upload} resizeMode='contain'/>
              <Text className="text-gray-100 font-medium text-xs">Click to upload</Text>
            </View>
        </View>
        )}
      </TouchableOpacity>
      <Text className="text-base text-gray-100 font-semibold mx-4 mt-8">Thumbnail Image</Text>
      <TouchableOpacity onPress={()=> openPicker('image')} className="px-4">
        {form.thumbnail? 
        (
          <Image 
          className="w-full h-40 rounded-2xl mt-4" 
          source={{uri:form.thumbnail.uri}} 
          resizeMode='cover'/> 
        ):
        (
          <View className="h-[50px] bg-black-100 rounded-xl border-2 border-black-200 mt-2 justify-center items-center">
            <View className="items-center rounded-2xl flex-row justify-center items-center">
              <Image className="w-[20px] h-[20px]" source={icons.upload} resizeMode='contain'/>
              <Text className="text-gray-100 font-medium text-xs mx-2">Choose a file</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      <CustomButton 
      handlePress={submit}
      title="Upload the Video" 
      containerStyles="mx-4 mt-7"
      isLoading={uploading}
      />

    </ScrollView>
    </SafeAreaView>
  )
}

export default Create