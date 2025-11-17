import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const apiKey = 'd44ce69554ccf4a4b62ac6d734eca2e1';

interface Movie {
  id: string
  title: string
  overview: string
  poster_path: string
}

interface GenreByName {
  id: number
  name: string
}

export default function Index() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [genresByName, setGenresByName] = useState<GenreByName[]>([]);
  const [selectedGenre, setSelectedGenre] = useState();

  useEffect(() => {
    fetchGenres();
  }, [])

  const fetchGenres = async () => {
    try {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      setGenresByName(data.genres);
    } catch (error){
      console.log(error);
    }
  };

  const chooseRandomMovies = (data: any) => {
    const choosenMovies: Movie[] = [];
        
    if(data && Array.isArray(data.results)) {
      for (let index = 0; index < 3; index++) {
        const randomMovie = Math.floor(Math.random() * data.results.length);

        console.log(data.results[randomMovie].title)
        console.log(choosenMovies.length)
        console.log(data.results[randomMovie].poster_path)
        if (choosenMovies.some(choosenMovies => choosenMovies.title === data.results[randomMovie].title)) {
          console.log("movie already is in the list");
          index--;
        } else {
          choosenMovies.push(data.results[randomMovie]);
        }
      }
      setMovie(choosenMovies)
    } else {
      console.log("no data is fetched")
    }
  }

  const fetchMovies = async () => {
    const randomPage = Math.floor(Math.random() * 5) + 1;

    if(selectedGenre){
      try {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&language=en-US&sort_by=popularity.desc&page=${randomPage}`;
        const response = await fetch(url);
        const data = await response.json();

        // data.results.forEach(index => {
        //   console.log(index.poster_path)
        // });
        chooseRandomMovies(data);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    } else {
      alert("Choose a genre!");
    }
  };

  return (
    <ScrollView>
      <Dropdown
        style={styles.genresDropdown}
        containerStyle={styles.genresDropdownContainer}
        data={genresByName}
        labelField="name"
        valueField="id"
        placeholder="Select a genre"
        value={selectedGenre}
        onChange={(item) => {
          setSelectedGenre(item.id)
        }}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          fetchMovies();
        }}
      >
        <Text style={{ fontSize: 20 }}>Get Movies</Text>
      </Pressable>
      <SafeAreaView>
        <View>
          {movie.map((movie, index) => (
            <View 
              style={styles.movieView}
              key={index}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Link href={{ pathname: "/movieDetails", params: { id: movie.id } }}>
                <Image
                  source={
                    movie.poster_path
                      ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                      : require("../assets/images/defaultPoster.png")
                  }
                  style={ styles.moviePoster }
                />
              </Link>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  movieTitle: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center"
  },
  button: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  genresDropdown: {
    backgroundColor: "white",
    margin: 30,
    padding: 10,
    borderRadius: 8,
    width: "90%",
    height: 50,
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  genresDropdownContainer: {
    width: "90%",
    //marginTop: -10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  movieView: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  moviePoster: {
    width: 300, 
    height: 400, 
    borderRadius: 10,
  }
})
