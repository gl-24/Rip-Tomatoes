import './App.css';
import SearchIcon from './search.svg';
import { useEffect,useState } from 'react';
import MovieCard from './MovieCard';
const AIP_URL = 'http://www.omdbapi.com?apikey=a6584e04';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovie = async (title) => {
    const response = await fetch(`${AIP_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovie('avengers');
  }, []);

  return (
    <div className="App">
      <h1>Rip Tomatoes</h1>
      <div className="search">
        <input placeholder="Search for movies"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
         />
         <img src={SearchIcon} alt="search"
         onClick={()=>searchMovie(searchTerm)} />
      </div>

      {
        movies?.length > 0 
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>    
          ):
          (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;
