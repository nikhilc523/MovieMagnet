import { View, Text ,ScrollView, Dimensions,TouchableOpacity,Image,Platform} from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
var {width, height} = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/movieList';
import Loading from '../components/LoadingScreen';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../API/movieDB';

export default function MovieScreen() {
   const {params:item}=useRoute();
   const navigation=useNavigation();
   const [isFavorite,setisFavorite]=useState(false);
   let movieName='Ant-Man and the Wasp:Quantumania';
   const [cast,setCast]=useState([]);
   const [similar,setSimilar]=useState([]);
   const [loading,setLoading]=useState(false)
   const [movie,setMovie]=useState({})
   useEffect(()=>{
      //console.log('itemid:',item.id);
      setLoading(true);
      getMovieDetails(item.id)
      getMovieCredits(item.id)
      getSimilarMovies(item.id)

   },[item]);

   const getMovieDetails=async id=>{
    const data = await fetchMovieDetails(id);
    if(data) setMovie(data);
    setLoading(false)
    //console.log('got movie details',data)
   }
   const getMovieCredits=async id=>{
    const data= await fetchMovieCredits(id);
   //console.log('got credits:',data)
    if (data && data.cast) setCast(data.cast)
   }
   const getSimilarMovies=async id=>{
    const data= await fetchSimilarMovies(id);
    //console.log('got similar:',data)
    if (data && data.results) setSimilar(data.results)
   }
  return (
    <ScrollView
    contentContainerStyle={{paddingBottom:20}}
    style={tw`flex1 bg-neutral-900`}
    >
        {/* back button and Movie Poster*/}
        <View style={tw`w-full`}>
        <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4`}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{ backgroundColor: '#eab308', ...tw`rounded-xl p-1` }}>
        <AntDesign name="left" size={28} strokeWidth={2.5} color='white' />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>setisFavorite(!isFavorite)}>
    <AntDesign name="heart" size={28}  color={isFavorite?'#eab308':'white'} />
    </TouchableOpacity>
</SafeAreaView>
{
  loading?(
     <Loading />
  ):(
<View>
    <Image 
    //source={require('../assets/images/moviePoster2.png')}
    source={{uri:image500(movie?.poster_path)|| fallbackMoviePoster}}
    style={{width,height:height*0.55}}
    />
    <LinearGradient 
    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
    style={{ width, height: height * 0.40, ...tw`absolute bottom-0` }}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
/>

</View>
  )
}


{/*Movie Details */}
<View style={{ marginTop: -(height * 0.09), ...tw`space-y-3` }}>
    <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
        {movie?.title}
    </Text>
    {/* status , release, runtime*/}
    {
        movie?.id ?(
            <View style={tw`flex-row justify-center my-3`}>
            <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
                {movie?.status} . {movie?.release_date?.split('-')[0]}. {movie?.runtime} min
            </Text>
        </View>

        ):null
    }
   
    <View style={tw`flex-row justify-center mx-4 space-x-2 my--1`}>
        {
            movie?.genres?.map((genre,index)=>{
                let showDot=index+1!=movie.genres.length;
                return(
                    <Text key={index}style={tw`text-neutral-400 font-semibold text-base text-center`}>
                        {genre?.name}{showDot?'  .  ':null}
                        </Text>
                )
            })
        }
    </View>
    <Text  style={tw`text-neutral-400 mx-4 tracking-wide my-4`}>
   {movie?.overview}

    </Text>
    {/*cast*/}
    <ScrollView>
      {cast.length>0 &&  <Cast navigation={navigation} cast={cast}/>}
      {similar.length>0 && <MovieList title="Similar Movies" hideSeeAll={true}  data ={similar} />}
    </ScrollView>

</View>
        </View>
    </ScrollView>
  )
}