import { View, FlatList,Text } from 'react-native';
import React, { useEffect } from 'react';
import EmptyList from '../../components/EmptyList';
import useAppwrite from '../../lib/useAppwrite';
import Videos from '../../components/Videos';
import { searchPosts } from '../../lib/appwrite';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/Search';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="items-center w-full justify-center bg-primary h-full">
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
          <View className="h-full items-center justify-center mt-10">
            <EmptyList title={"No videos were found"} />
          </View>
        )}
        ListHeaderComponent={()=> (
          <View className="w-full mt-0">
            <Text className="text-gray-100 font-semibold text-xl px-5 mt-4">Search Results</Text>
            <Text className="text-white font-bold text-2xl px-5 mb-5">{query}</Text>
            <SearchInput/>
          </View>
        
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
