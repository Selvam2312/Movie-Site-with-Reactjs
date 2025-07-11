import MovieCard from "../components/MovieCard/"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css'


function Home(){
    const [searchQuery, setsearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularmovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies... Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        loadPopularmovies();
    }, [])
    
    const handlesearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies. Please try again later.");

        } finally {
            setLoading(false)
        }
    }

    return <div className="home">
        <form onSubmit={handlesearch} className="seaech-form">
            <input type="text" placeholder="Search for movies..." className="search-input" 
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-messahe">{error}</div>}


        {loading ? ( <divw className="loading">Loading...</divw> ):
        (<div className="movies-grid">
            {movies.map((movie) => (
                 <MovieCard movie ={movie} key={movie.id}/>
                
            ))}
        </div>
        )}
    </div>
}

export default Home