import { Image, View, Text } from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import {icons} from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='gap-2 items-center justify-center flex'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        style={{ width: 20, height: 20 }}
      />
      <Text className={`${focused ? "font-bold text-orange-300" : "font-semibold text-gray-200"} text-xs `}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
   <>
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
   <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
   <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
   <Tabs.Screen
          name="bookmarks"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmarks"
                focused={focused}
              />
            ),
          }}
        />
   <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
   </Tabs>
   </>
  )
}

export default TabsLayout