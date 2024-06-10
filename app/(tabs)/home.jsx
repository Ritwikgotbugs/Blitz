import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import Header from '../../components/Header';
import { getPosts, getLatest } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import Videos from '../../components/Videos';
import Trending from '../../components/Posts';
import EmptyList from '../../components/EmptyList';
import * as Haptics from 'expo-haptics'

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getPosts);
  const { data: trending } = useAppwrite(getLatest);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="items-center w-full justify-center">
        <FlatList
          showsVerticalScrollIndicator={false}
          className="w-full h-full flex mb-0 mt-5"
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Videos
              title={item.title}
              thumbnail={item.thumbnail}
              videoUrl={item.video}
              avatar={item.creator.avatar}
              username={item.creator.username}
              userId={item.creator.$id}
              postId={item.$id}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList title="No items found" subtitle="Be the first one to upload a video!!" />
          )}
          ListHeaderComponent={() => (
            <>
              <Header />
              <View className="w-full mt-0 justify-center items-center">
                <Trending posts={trending} />
                <Text className="text-gray-100 font-regular text-xl px-5 mt-5 mb-5">Explore</Text>
              </View>
            </>
          )}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;