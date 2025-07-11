import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvidr = ({children}) => {
    const [favorites, setfavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if(storedFavs) setfavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favotires', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setfavorites(prev => [...prev, movie])
    }

    const removeFromFrvoites =(movieId) => {
        setfavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorites = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFrvoites,
        isFavorites
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}


