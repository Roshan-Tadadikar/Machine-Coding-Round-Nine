import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import {Route,Routes} from "react-router-dom"
import VideListingPage from './Components/VideListingPage';
import SingleVideoPage from './Components/SingleVideoPage';
import PlayList from './Components/PlayList';
import AllVideoList from './Components/AllVideoList';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/listing' element={<VideListingPage/>}/>
      <Route path='/explore' element={<Home/>}/>
      <Route path='/watchLater' element={<Home/>}/>
      <Route path='/singelPage' element={<SingleVideoPage/>}/>
      <Route path='/playList' element={<PlayList/>}/>
      <Route path='/allVideosList' element={<AllVideoList/>}/>
     </Routes>
    </div>
  );
}

export default App;
