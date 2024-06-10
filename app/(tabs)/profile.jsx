import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyList from '../../components/EmptyList'
import { icons } from '../../constants'
import { changeAvatar, getPosts, getUserPosts, signOut } from '../../lib/appwrite'
import { FlatList } from 'react-native'
import Videos from '../../components/Videos'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { RefreshControl } from 'react-native'
import { useState } from 'react'
import * as Haptics from 'expo-haptics'
import * as DocumentPicker from 'expo-document-picker'

const Profile = () => {
  const logout= async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  }

  const {user,setUser,setIsLogged }= useGlobalContext();
  const {data:posts,refetch}= useAppwrite(()=> getUserPosts(user.$id))

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <FlatList
        showsVerticalScrollIndicator={false}
        className="w-full h-full flex mb-0 mt-5"
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="mt-5">

          <Videos
          title={item.title}
          thumbnail={item.thumbnail}
          videoUrl={item.video}
          avatar={item.creator.avatar}
          username={item.creator.username}
          userId={item.creator.$id}
          postId={item.$id}
        />
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
          <Image source={icons.logout} className="w-6 h-6 mx-5 my-4" resizeMode='contain'/>
        </TouchableOpacity>
        </View>
        <View className="items-center justify-center relative">
          <Image 
          source={{uri: user?.avatar}} className=" h-20 w-20 rounded-full mx-auto my-5" resizeMode='cover' />
          <TouchableOpacity className="w-6 h-6 absolute right-40 top-20" onPress={()=> {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
            updateAvatar();
          }}>
            <Image source={icons.menu} className="w-6 h-6" resizeMode='contain'/>
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold text-center">{user?.username}</Text>
        </View>
        <View className="items-center justify-center flex-row mt-3 mb-5">
          <View className="flex-column items-center mr-5">
            <Text className="font-bold text-white text-2xl">{posts.length}</Text>
            <Text className="text-gray-100 text-l">Posts</Text>
          </View>
          <View className="items-center ml-5">
            <Text className="font-bold text-white text-2xl">0</Text>
            <Text className="text-gray-100 text-l">Followers</Text>
          </View>
        </View>
          </View>
        )}
        
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }
      />
      </View>
    </SafeAreaView>
  )
}

export default Profile