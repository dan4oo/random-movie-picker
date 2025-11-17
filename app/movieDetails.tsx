import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const apiKey = 'd44ce69554ccf4a4b62ac6d734eca2e1';

interface movieDetails {
    title: string
    vote_average: string
    runtime: number
    release_date: string
    overview: string
    poster_path: string
}

export default function MovieDetails() {
    const { id } = useLocalSearchParams();
    const [movieDetails, setMovieDetails] = useState<movieDetails>()
    console.log(id)

    useEffect(() => {
        fetchMoveDetails()
    }, [])

    const fetchMoveDetails = async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        const response = await fetch(url);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
        setMovieDetails(data)
    }
    return(
        <ScrollView style={{ marginBottom: 50 }}>
            <View>
                <Text style={styles.title}>{movieDetails?.title}</Text>
                <Image
                    style={styles.poster}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}` }}
                />
                <Text style={styles.overview}>{movieDetails?.overview}</Text>
                <Text style={styles.runtime}>{movieDetails?.runtime} min</Text>
                <Text style={styles.vote_average}>{movieDetails?.vote_average}</Text>
                <Text style={styles.releaseDate}>{movieDetails?.release_date}</Text>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    poster: {
        alignSelf: "center",
        width: 200,
        height: 300,
        borderRadius: 10,
        margin: 10,
    },
    title: {
        margin: 10,
        fontSize: 30,
        alignSelf: "center"
    },
    overview: {
        margin: 10,
        fontSize: 20,
        textAlign: "center",
        fontStyle: "italic"
    },
    runtime: {
        margin: 10,
        fontSize: 40
    },
    vote_average:{
        margin: 10,
        fontSize: 40
    },
    releaseDate: {
        margin: 10,
        fontSize: 40
    }
})