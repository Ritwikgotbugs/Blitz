import { router } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyList from '../../components/EmptyList'
import { icons, images } from '../../constants'
import { getUserPosts, signOut } from '../../lib/appwrite'
import { FlatList } from 'react-native'
import Videos from '../../components/Videos'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Profile = () => {
  const logout= async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  }

  const {user,setUser,setIsLogged }= useGlobalContext();
  const {data:posts}= useAppwrite(()=> getUserPosts(user.$id))
  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
        showsVerticalScrollIndicator={false}
        className="w-full h-full flex mb-0 mt-5"
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="mt-5">

            <Videos video={item} />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="h-full items-center">
            <EmptyList title={"No videos were found"} />
          </View>
        )}

        ListHeaderComponent={()=> (
          <View>
            <View className="w-full justify-end items-end flex-end">
        <TouchableOpacity onPress={logout}>
          <Image source={icons.logout} className="w-6 h-6 mx-5 my-4" />
        </TouchableOpacity>
        </View>
        <View>
          <Image 
          source={{uri: user?.avatar}} className=" h-20 w-20 rounded-full mx-auto my-5" resizeMode='cover' />
          <Text className="text-white text-2xl font-bold text-center">{user?.username}</Text>
        </View>
        <View className="items-center justify-center flex-row mt-3 mb-5">
          <View className="flex-column items-center mr-5">
            <Text className="font-bold text-white text-2xl">{posts.length}</Text>
            <Text className="text-gray-100 text-l">Posts</Text>
          </View>
          <View className="items-center ml-5">
            <Text className="font-bold text-white text-2xl">12.3k</Text>
            <Text className="text-gray-100 text-l">Followers</Text>
          </View>
        </View>
          </View>
        )}
        
      />
    </SafeAreaView>
  )
}

export default Profile