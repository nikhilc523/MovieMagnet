import { View, Text, TouchableWithoutFeedback, Dimensions,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../API/movieDB';
var {width,height}= Dimensions.get('window');
export default function Trendingmovies({data}) {
  const navigation = useNavigation();
  const handleClick=item=>{
    navigation.navigate('Movie',item);
  }
  return (
    <View style={tw`mb-8`}>

      <Text style={tw`text-white text-xl mx-4 mb-5`}>Trending</Text>
      <Carousel 
      data ={data} 
      renderItem={({item})=> <MovieCard item={item} handleClick={handleClick} />}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display:'flex',alignItems:'center'}} />


    </View>
  )
}

const MovieCard=({item,handleClick})=>{
  //console.log('item.poster',item.poster_path);
return(
  <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
       <Image 
       //source={require('../assets/images/castImage1.png')}
       source={{uri:image500(item.poster_path)}}
      style={[
        {
          width: width * 0.6,
          height: height * 0.4,
        },
        tw`rounded-3xl`,
      ]} />
    </TouchableWithoutFeedback>
)
}