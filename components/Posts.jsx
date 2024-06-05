import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Posts = () => {
  return (
      <FlatList
        horizontal
        data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-white text-3xl mx-3">{item.id}</Text>
        )}
      />
  )
}

export default Posts