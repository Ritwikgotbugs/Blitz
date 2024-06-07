import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import { icons } from "../constants";

const Videos = ({ video: { title, thumbnail, video, creator: { avatar, username } } }) => {
  const [play, setPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-10">
      <View className="flex flex-row gap-3 items-start">
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

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: "https://player.vimeo.com/video/949579770?h=897cd5e781" }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
          >
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-xl mt-3"
              resizeMode="cover"
            />

            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View className="flex flex-row w-full mt-5 gap-x-7 items-center">
            <TouchableOpacity onPress={() => {
              setIsLiked(!isLiked)
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }}>
            <Image 
              source={isLiked ? icons.heart_fill : icons.heart} 
              className="w-7 h-7" 
              resizeMode="contain" 
            />
          </TouchableOpacity>
            <TouchableOpacity onPress={()=> {
              setIsSaved(!isSaved)
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }}>
              <Image source={isSaved? icons.save_fill : icons.save} className="w-7 h-6" resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={icons.share} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Videos;
