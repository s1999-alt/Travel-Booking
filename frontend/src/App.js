import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserWrapper from './wrapper/UserWrapper';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path='*' element={<UserWrapper/>}/>
      </Routes>
     </Router>
    </>
  );
}

export default App;
