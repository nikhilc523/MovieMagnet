import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';
import { apiKey } from '../constants';

//endpoints
const apiBaseURL='https://api.themoviedb.org/3';
const trendingMoviesEndpoint=`${apiBaseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint=`${apiBaseURL}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint=`${apiBaseURL}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint = `${apiBaseURL}/search/movie?api_key=${apiKey}`;


export const image500= path=> path?`https://image.tmdb.org/t/p/w500${path}`:null;
export const image342= path=> path?`https://image.tmdb.org/t/p/w342${path}`:null
export const image185= path=> path?`https://image.tmdb.org/t/p/w185${path}`:null


export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const movieDetailsEndpoint = id=> `${apiBaseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = id=> `${apiBaseURL}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id=> `${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}`;


const apiCall = async (endpoint,params)=>{
        const options={
            method:'GET',
            url:endpoint,
            params:params?params:{}
        }
        try{
            const response = await axios.request(options);
            return response.data;
        }
        catch{
            console.log('error:',error)
            return{}
        }

}

export const fetchTrendingMovies=()=>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies=()=>{
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchtopRatedMovies=()=>{
    return apiCall(topRatedMoviesEndpoint);
}
// movie screen apis
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}
// person screen apis
export const fetchPersonDetails = (personId)=>{
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId)=>{
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}



//'https://api.themoviedb.org/3/trending/movie/day?language=en-US'