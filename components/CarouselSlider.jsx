import { View, Text, FlatList } from 'react-native';
import React from 'react';
import EmptyList from './EmptyList';
import { RefreshControl } from 'react-native';
import { useState } from 'react';
import Trending from './Posts';
import useAppwrite  from '../lib/useAppwrite';
import { getLatest, getPosts } from '../lib/appwrite';
import Videos from './Videos';
import Header from './Header';
import {useGlobalContext} from '../context/GlobalProvider';

const CarouselSlider = () => {
  const {user} = useGlobalContext();
  const {data: posts,refetch} = useAppwrite(getPosts)
  const {data: trending} = useAppwrite(getLatest)
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false)


  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <>
    <View className="items-center w-full justify-center">
      <FlatList
      showsVerticalScrollIndicator={false}
        className="w-full h-full flex mb-0 mt-5"
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Videos video={item}/>
        )}
        ListEmptyComponent={() => (
          <EmptyList title="No items found" subtitle="Be the first one to upload a video!!" />
        )}
        ListHeaderComponent={() => (
          <>
          <Header/>
          <View className="w-full mt-0 justify-center items-center">
            <Trending posts={trending}/>
            <Text className="text-gray-100 font-regular text-xl px-5 mt-5 mb-5">Explore</Text>
          </View>
          </>
        )}
        refreshControl=
        {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF"/> }
      />
    </View>
    </>
  );
};

export default CarouselSlider;
