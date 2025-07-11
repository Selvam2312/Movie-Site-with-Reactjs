import './css/App.css'
import Favorites from './pages/Favorite'
import Home from './pages/Home';
import {Routes, Route} from "react-router-dom"
import { MovieProvidr } from './contexts/MovieContext';
import NavBar from './components/NavBar'


function App() {
  const movieNumber =1;

  return (
    <MovieProvidr>
      <NavBar/>
    <main className='main-contect'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
    </main>
    </MovieProvidr>
  )
}



export default App
