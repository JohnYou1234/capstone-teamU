import Header from './components/header/Header';
import Posts from './components/posts/Posts';
import { Routes, Route} from "react-router-dom";
import Create from './components/create/Create.js';
import Thread from './components/thread/Thread.js';
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
            <Route path="thread/:postId" element={<Thread />} />
            <Route path="/*" element={<div>
              <p>404</p>
            </div>} />

        </Routes>
    </div>
  );
}

export default App;
