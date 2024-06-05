import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CarouselSlider from '../../components/CarouselSlider'
import Header from '../../components/Header'
import { getPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
const Home = () => {

  const {data: posts} = useAppwrite(getPosts)

  return (
    <SafeAreaView className="h-full bg-primary">
      <Header/>
      <CarouselSlider/>

    </SafeAreaView>
  )
}

export default Home