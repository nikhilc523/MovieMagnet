import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import * as Progress from 'react-native-progress'
var {height,width}=Dimensions.get('window')
export default function Loading() {
  return (
    <View 
    style={{
        ...tw`absolute flex-row justify-center items-center`,
        height: height, // Make sure 'height' and 'width' are defined elsewhere
        width: width,
    }}
>
     <Progress.CircleSnail thickness={12}  size={160} color='orange'/>
    </View>
  )
}