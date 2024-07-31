import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

const TabIcon = ({ icon, color, name, focused }) =>{


  return(
<View className='items-center justify-center gap-2' >
  <Image
  source={icon}
  resizeMode='contain'
  tintColor={color}
  className='w-5 h-5'

  />
<Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
 style={{color:color}}
>
  {name}
</Text>

</View>

  )
}
const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor:'#7B88F2',
        tabBarInactiveTintColor:'#CDCDE0',
        tabBarStyle:{
          backgroundColor:'#161622',
          borderTopWidth:1,
          borderTopColor:'#232533',
          height:65,
        }
      }}
      >
        <Tabs.Screen
           name='home'
           options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color,focused })=>(
              <TabIcon 
              icon={icons.home}
              color={color}
              name={"Home"}
              focused={focused}
            />
            )
           }}
           />

           <Tabs.Screen
           name='create'
           options={{
            title:'Stories',
            headerShown:false,
            tabBarIcon:({color,focused })=>(
              <TabIcon 
              icon={icons.moon}
              color={color}
              name={"Stories"}
              focused={focused}
            />
            )
           }}
           />


           <Tabs.Screen
           name='profile'
           options={{
            title:'Sounds',
            headerShown:false,
            tabBarIcon:({color,focused })=>(
              <TabIcon 
              icon={icons.note}
              color={color}
              name={"Sounds"}
              focused={focused}
            />
            
            
            )
           }}
           />
           <Tabs.Screen
           name='calandar'
           options={{
            title:'calendar',
            headerShown:false,
            tabBarIcon:({color,focused })=>(
              <TabIcon 
              icon={icons.calendarha}
              color={color}
              name={"calendar"}
              focused={focused}
            />
            
            
            )
           }}
           />

           


           <Tabs.Screen
           name='MoodEntries'
           options={{
            href: null,
            title:'MoodEntries',
            headerShown:false,
            tabBarIcon:({color,focused })=>(
              <TabIcon 
              icon={icons.profile}
              color={color}
              name={"Mood"}
              focused={focused}
            />
            
            
            )
           }}
           />

           {/* <Tabs.Screen
           name='pages/FeelingsAdd'
           options={{
            href: null,
            title:'FeelingsAdd',
            headerShown:true,
            tabBarIcon:({color,focused })=>(
              <TabIcon 
              icon={icons.profile}
              color={color}
              name={"MFeelingsAdd"}
              focused={focused}
            />
            
            
            )
           }}
           /> */}

           {/* <Tabs.Screen
           name='pages/AddNote'
           options={{
            href: null,
            title:'AddNote',
            headerShown:false,
            tabBarIcon:({color,focused })=>(
              <TabIcon 
              icon={icons.profile}
              color={color}
              name={"AddNote'"}
              focused={focused}
            />
            
            
            )
           }}
           /> */}

           

     </Tabs>
    </>
  )
}

export default TabsLayout



