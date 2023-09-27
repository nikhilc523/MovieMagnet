import { View, Text,ScrollView,Dimensions,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation,useRoute } from '@react-navigation/native';
var {width,height}=Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import MovieList from '../components/movieList';
import Loading from '../components/LoadingScreen';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../API/movieDB';
export default function PersonScreen() {
    const {params:item}=useRoute();
    const navigation = useNavigation();
    const [isFavorite,setisFavorite]=useState(false);
    const [personMovies,setpersonMovies]=useState({})
    const [loading,setLoading]=useState(false)
    const [person,setPerson]=useState({})
    useEffect(()=>{
       setLoading(true)
       //console.log('person:',item)
      getPersonDetails(item.id)
      getPersonMovies(item.id)
    },[item])

    const getPersonDetails=async id=>{
        const data= await fetchPersonDetails(id);
        //console.log('got person details:',data);
        setLoading(false);
        if (data) setPerson(data);
       
       }
       const getPersonMovies=async id=>{
        const data= await fetchPersonMovies(id);
        //console.log('got person Movies',data);
        if (data && data.cast) setpersonMovies(data.cast);
       }
       
  return (
    <ScrollView
    style={tw`flex-1 bg-neutral-900`}
    contentContainerStyle={{paddingBottom:20}}
    >
        {/* Back Button */}
        <SafeAreaView style={tw` z-20 w-full flex-row justify-between items-center px-4`}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{ backgroundColor: '#eab308', ...tw`rounded-xl p-1` }}>
        <AntDesign name="left" size={28} strokeWidth={2.5} color='white' />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>setisFavorite(!isFavorite)}>
    <AntDesign name="heart" size={28}  color={isFavorite?'red':'white'} />
    </TouchableOpacity>
</SafeAreaView>
{
  loading?(
    <Loading />
  ):(
    
<View>
<View 
    style={{
        ...tw`flex-row justify-center`,
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: { width: 0, height: 5},
        shadowOpacity:1
    }}>
        <View 
        style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}
        >
        <Image 
        //source={require('../assets/images/kaushal.png')}
        source={{uri:image342(person?.profile_path)||fallbackPersonImage}}
        style={{height:height*0.43,width:width*0.74}}
         />

            
        </View>
    

    </View>
    <View style={tw`mt-6`}>
        <Text style={tw`text-3xl text-white font-bold text-center`}>
            {
                person?.name
            }
        </Text>
        <Text style={tw`text-base text-neutral-400 text-center`}>
            {
                person?.place_of_birth
            }
        </Text>
    </View>
    <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
     <View style={tw`border-r-2  border-r-neutral-400 px-2 items-center`}>
        <Text style={tw`text-white font-semibold`}>Gender</Text>
        <Text style={tw`text-neutral-300 text-sm`}>{person?.gender==1?'Female':'Male'}</Text>
     </View>
     <View style={tw`border-r-2  border-r-neutral-400 px-2 items-center`}>
        <Text style={tw`text-white font-semibold`}>Birthday</Text>
        <Text style={tw`text-neutral-300 text-sm`}>{person?.birthday}</Text>
     </View>
     <View style={tw`border-r-2  border-r-neutral-400 px-2 items-center`}>
        <Text style={tw`text-white font-semibold`}>Known for</Text>
        <Text style={tw`text-neutral-300 text-sm`}>{person?.known_for_department}</Text>
     </View>
     <View style={tw`px-2 items-center`}>
        <Text style={tw`text-white font-semibold`}>Popularity</Text>
        <Text style={tw`text-neutral-300 text-sm`}>{person?.popularity?.toFixed(2)} %</Text>
     </View>
    </View>
    <View style={tw`my-6 mx-4 space-y-2`}>
        <Text style={tw`text-white text-lg`}>
            Biography

        </Text>
        <Text style={tw`text-neutral-400 tracking-wide`}>
       {
        person?.biography||'N/A'
       }

        </Text>

    </View>
    {/*Movie list*/}
    <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
    
</View>

  )
}

    </ScrollView>
  )
}