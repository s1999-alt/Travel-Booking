import './App.css';
import Header from './Components/Header/Header';
import Memories from './Components/Memories/Memories';
import Nav from './Components/Nav/Nav';
import Trips from './Components/Trips/Trips';

function App() {
  return (
    <>
      <div className="App">
        <Nav/>
        <Header/>
        <Memories/>
      </div>
      <Trips/>
    </>
  );
}

export default App;
