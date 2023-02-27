import Header from './components/header/Header';
import Posts from './components/posts/Posts';
import { Routes, Route, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
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
            <Route path="create" element={<p>create !</p>} />
            <Route path="/*" element={<p>Nothing here... </p>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
