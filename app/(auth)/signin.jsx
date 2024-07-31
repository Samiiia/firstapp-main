import { View, Text,Image, ScrollView, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native'
import { useRef, useState } from "react";
import { SafeAreaView  } from 'react-native-safe-area-context';
import {  images } from '@/constants';
import { icons } from '@/constants';
import { ExpoRoot, Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/contextAuth';

 
 
const signIn = () => {
  const router = useRouter();
  const [loading, setLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {signin} = useAuth();
  const emailRef=useRef("");
  const passwordRef=useRef("");

  const handleLogin = async()=> {
    console.log('Handle Login Called');
    console.log('Email:', emailRef.current);
    console.log('Password:', passwordRef.current);

    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Sign In'," Please fill all thefields!");
      return;
    }
    setLoading(true);

    let response = await signin (emailRef.current ,passwordRef.current);
    setLoading(false);
    console.log('got result',response);

    if (!response.success){
      Alert.alert('Sign In',response.msg);
    }

    

  }

 
 


  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className='w-full justify-center items-center  min-h-[vh70] px-5'>
          <Image
           source={images.logo}
           resizeMode='contain' className='  w-[80px] h-[25px] '
          />

        
          <Text className=' text-2xl text-white text-semibold mt-9 font-psemibold '> Sign in to AORA </Text>

          <View className={`space-y-2 `}>
          <Text className='text-base text-gray-100 font-pmedium mt-14 '>Email</Text>
           <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row'>
           
           <TextInput
           onChangeText={value => emailRef.current = value}
           className="flex-1 text-white font-psemibold text-base"
           placeholder='Email Adress'
           placeholderTextColor="#7B7B8B"
           
           />

           </View>
           </View>

            
           <View className={`space-y-2 `}>
          <Text className='text-base text-gray-100 font-pmedium mt-14 '>Password</Text>
           <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row'>
          
           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
            
            >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 "
              resizeMode="contain"
            />
          </TouchableOpacity>

           <TextInput
           
           onChangeText={value => passwordRef.current = value}
           className="flex-1 text-white font-psemibold text-base"
           placeholder='Password'
           placeholderTextColor="#7B7B8B"
           secureTextEntry={ !showPassword}
         
           
           />
           

           </View>
           </View>

          <TouchableOpacity
           onPress={handleLogin}
           className={`bg-secondary  mt-7 w-full rounded-xl min-h-[62px] justify-center `} >
           <Text className={`text-primary text-center font-pbold text-lg  `}>Sign In</Text>

          </TouchableOpacity>
           
          
          

          

          
          
           <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account? 
            </Text>
            <Pressable onPress={()=> router.push('signup')}>
            <Text   className='text-lg font-psemibold text-secondary-100'>Sign Up</Text>
            </Pressable>
           
           </View>



        </View>

      </ScrollView>
      
    </SafeAreaView>
  )
}

export default signIn
