import Header from './components/header/Header';
import Posts from './components/posts/Posts';
import { Routes, Route} from "react-router-dom";
import Create from './components/create/Create.js';
function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path='/' element={
              <>
              <div className='boardInfo'>
                <h3>General</h3>
              </div>             
              <Posts />
              </>
            }/>
            <Route path="search" element={<p>Search !</p>} />
            <Route path="create" element={<Create />} />
            <Route path="/*" element={<p>Nothing here... </p>} />

        </Routes>
    </div>
  );
}

export default App;
