import { View, Text, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Trendingmovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/LoadingScreen';
import { fetchTrendingMovies, fetchtopRatedMovies ,fetchUpcomingMovies} from '../API/movieDB';
export default function HomeScreen(){
    const [trending,setTrending]=useState([])
    const [upcoming,setUpcoming]=useState([])
    const [topRated,setToprated]=useState([])
    const [loading,setLoading]=useState(true)
    const navigation=useNavigation();
    useEffect(()=>{
     getTrendingMovies();
     getUpcomingMovies();
     getTopRatedMovies();
    },[])
    const getTrendingMovies=async()=>{
        const data=await fetchTrendingMovies();
        //console.log('Trending',data)
        if(data && data.results ) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovies=async()=>{
        const data=await fetchUpcomingMovies();
        //console.log('Up coming',data)
        if(data && data.results ) setUpcoming(data.results)
    }
    const getTopRatedMovies=async()=>{
        const data=await fetchtopRatedMovies();
        //console.log('got Top Rated',data)
        if(data && data.results ) setToprated(data.results)
    }
    return(
        <View style={tw`flex-1 bg-neutral-800`}>
            {/*Search bar and logo*/}
            <SafeAreaView style={tw`-mb-2`}>
                <StatusBar style='light' />
                <View style={tw`flex-row justify-between items-center mx-4`} >
                    <AntDesign name="menuunfold" size="30" color = "white" />
                    <Text 
                    style={tw`text-white text-3xl font-bold`}>
                        <Text style={tw`text-[#eab308]`}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                        <AntDesign name="search1" size="30" color='white' />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
            {
                loading?(
                    <Loading />

                ):(
                    <ScrollView   showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:10}}>
                    {trending.length>0 && <Trendingmovies data={trending} />}
                    {upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} />}
                    {topRated.length>0 && <MovieList title="Top Rated" data={topRated} />}
          
                      </ScrollView>
                )
            }
        
            

        </View>
    )
}
