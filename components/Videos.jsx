import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import { icons } from "../constants";
import { ActivityIndicator } from "react-native";
import * as Sharing from 'expo-sharing';
import { useGlobalContext } from "../context/GlobalProvider";
import { deletePost, getPosts } from "../lib/appwrite";
import { Alert } from "react-native";

const Videos = ({ title, thumbnail, videoUrl, avatar, username,userId, postId }) => {
  const {user}= useGlobalContext();
  const [play, setPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  
  const onDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress:  () =>  {
            deletePost(postId);
          }
        }
      ],
      { cancelable: false }
    );
  };
  return (
    <View className="flex flex-col items-center px-4 mb-10">
      <View className="flex flex-row gap-3 items-center">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-bold text-l text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-regular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        {user && user.$id === userId ? (
          <TouchableOpacity className="pt-2" onPress={()=> {
            onDelete();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}>
          <Image 
          source={icons.delete_icon} 
          className="w-6 h-6" 
          resizeMode="contain" />
        </TouchableOpacity>
        ):(
          <View></View>
        )}
      </View>

      <View className="w-full mt-4">
        {play ? (
          <View className="w-full h-60 rounded-xl bg-white/10 flex items-center justify-center">
            {loading && (
            <ActivityIndicator
              size="large"
              color="#fff"
              className="absolute"
            />
          )}
            <Video
              source={{ uri: videoUrl }}
              className="w-full h-64 rounded-xl"
              resizeMode={ResizeMode.COVER}
              useNativeControls
              shouldPlay
              isLooping
              onPlaybackStatusUpdate={(status) => {
                if (status.isLoading) {
                  setLoading(true);
                } else {
                  setLoading(false);
                }
                if (status.didJustFinish) {
                  setPlay(false);
                }
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {setPlay(true); setLoading(true);}}
            className="w-full h-60 rounded-xl flex justify-center items-center bg-white/10"
          >
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-60 rounded-xl"
              resizeMode="cover"
            />

            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        <View className="flex flex-row w-full mt-3 px-2 gap-x-4 items-center">
          <TouchableOpacity
            className="flex flex-row items-center gap-x-1"
            onPress={() => {
              setIsLiked(!isLiked);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Image
              source={isLiked ? icons.heart_fill : icons.heart}
              className="w-7 h-7"
              resizeMode="contain"
            />
             <Text className="text-white text-xl pl-1">
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          className="flex flex-row items-center"
            onPress={() => {
              setIsSaved(!isSaved);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Image
              source={isSaved ? icons.save_fill : icons.save}
              className="w-7 h-6"
              resizeMode="contain"
            />
           
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
            Sharing.shareAsync(videoUrl);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}>
            <Image source={icons.share} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>

          { user && user.$id === userId ? (
            <View/>
          ):(
            <TouchableOpacity
            onPress={() => {
              setFollowing(!following);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <View className={` border-1 border rounded-lg px-2 py-2 ${following? "bg-blue-500" : "bg-black-200 border-white"}` }>
              <Text className={`${following? "text-black" : "text-white"} font-bold`}>{following ? "Following" : "Follow"}</Text>
            </View>
          </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Videos;
