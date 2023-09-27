import React, { useCallback, useState } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/LoadingScreen';
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from '../API/movieDB';
const { height, width } = Dimensions.get('window');

let movieName = "Ant Man:Wasp Man and the Mighty Warriors";

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const handleSearch = value=>{
       if(value && value.length>2){
        setLoading(true);
        searchMovies({
            query:value,
            include_adult:'false',
            language:'en-US',page:'1',
            page:'1'
        }).then(
            data=>{
                setLoading(false);
                //console.log('got movies',data)
                if(data && data.results) setResults(data.results)
            }
        )
       }else{
        setLoading(false);
        setResults([])
       }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch,400),[]);

    return (
        <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
            <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                    style={tw`rounded-full p-3 m-1 bg-neutral-500`}
                >
                    <MaterialIcons name="clear" size="30" color="white" />
                </TouchableOpacity>
            </View>
            {/* Results View */}
            {loading ? (
                <Loading />
            ) : (
                results.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        style={tw`space-y-3 `}
                    >
                        <Text style={tw`text-white font-semibold ml-1`}>
                            Results ({results.length})
                        </Text>
                        <View style={tw`flex-row justify-between flex-wrap`}>
                            {results.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => navigation.navigate("Movie", item)}
                                    >
                                        <View style={tw`space-y-2 mb-4`}>
                                            <Image
                                                style={{
                                                    ...tw`rounded-3xl`,
                                                    width: width * 0.44,
                                                    height: height * 0.3,
                                                }}
                                                //source={require('../assets/images/moviePoster2.png')}
                                                source={{uri:image185(item?.poster_path)||fallbackMoviePoster}}
                                            />
                                            <Text style={tw`text-neutral-300 ml-1`}>
  {item?.title && item.title.length > 22 ? item.title.slice(0, 22) + '...' : item?.title}
</Text>

                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={tw`flex-row justify-center `}>
                        <Image
                            source={require('../assets/images/movieTime.png')}
                            style={tw`h-96 w-96`}
                        />
                    </View>
                )
            )}
        </SafeAreaView>
    );
}
