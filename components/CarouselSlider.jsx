import { View, Text, FlatList } from 'react-native';
import React from 'react';
import EmptyList from './EmptyList';
import { RefreshControl } from 'react-native';
import { useState } from 'react';
import Posts from './Posts';
import useAppwrite  from '../lib/useAppwrite';
import { getPosts } from '../lib/appwrite';
import Videos from './Videos';

const CarouselSlider = () => {
  const {data: posts,refetch} = useAppwrite(getPosts)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <>
      <Text className="text-gray-100 font-regular text-xl px-5 mt-5">Trending Posts</Text>
    <View className="items-center w-full justify-center px-4 mt-10">
      <FlatList
        className="w-full flex"
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Videos video={item}/>
        )}
        ListEmptyComponent={() => (
          <EmptyList title="No items found" subtitle="Be the first one to upload a video!!" />
        )}
        ListHeaderComponent={() => (
          <View className="w-full">
            <Posts/>
          </View>
        )}
        refreshControl=
        {<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </View>
    </>
  );
};

export default CarouselSlider;
