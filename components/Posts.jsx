import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { ActivityIndicator } from "react-native";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Animatable.View
      className=" mr-2 ml-2 bg-white/10 rounded-[33px]"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={400}
    >
      {play ? (
        <View className="relative w-52 h-72 rounded-[33px] bg-white/10 items-center justify-center">
        {loading && (
          <ActivityIndicator
          animating={setLoading}
          color="#fff"
          size="large"
          className="absolute"
        />
        )}
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px]"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
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
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {setPlay(true); setLoading(true);}}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[33px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
    showsHorizontalScrollIndicator={false}
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;