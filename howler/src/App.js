import Header from './components/header/Header';
import Posts from './components/posts/Posts';
import { Routes, Route} from "react-router-dom";
import Create from './components/create/Create.js';
import Thread from './components/thread/Thread.js';
import SearchResults from './components/results/SearchResults';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/board/"/>} />
            <Route path='/board/:boardId?' element={     
              <Posts />
            }/>
            <Route path="create" element={<Create />} />
            <Route path="thread/:postId" element={<Thread />} />
            <Route path="search/:query" element={<SearchResults />} />
            <Route path="/*" element={<div>
              <p>404</p>
            </div>} />

        </Routes>
    </div>
  );
}

export default App;
