import Header from './components/header/Header';
import Posts from './components/posts/Posts';
function App() {
  return (
    <div className="App">
      <Header />
      <div className='boardInfo'>
        <h3>General</h3>
      </div>
      <Posts />
    </div>
  );
}

export default App;
