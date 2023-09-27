import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { image185, image342, image500 } from '../API/movieDB';
import { fallbackMoviePoster } from '../API/movieDB';

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data }) {
  const navigation = useNavigation();

  // Check if data is defined and an array before using map
  if (!Array.isArray(data)) {
    return null; // or some fallback UI if needed
  }

  return (
    <View style={tw`mb-8 space-y-4`}>
      <View style={tw`mx-4 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-lg`}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={tw`text-lg text-white text-[#eab308]`}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}
            >
              <View style={tw`space-y-1 mr-4`}>
                <Image
                  source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                  style={[tw`rounded-3xl`, { width: width * 0.33, height: height * 0.22 }]}
                />

                <Text style={tw`text-neutral-300 ml-1`}>
                  {typeof item.title === 'string' && item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
