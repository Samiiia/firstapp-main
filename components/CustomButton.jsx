import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, onPress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl min-h-[62px] justify-center ${containerStyles} ${isLoading ? 'opacity-50' :''}`} disabled={isLoading}>
     
      <Text className={`text-primary text-center font-psemibold text-lg ${textStyles} `}>{title}</Text>
    
    </TouchableOpacity>
  )
}

export default CustomButton