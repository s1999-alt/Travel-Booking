import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserWrapper from './wrapper/UserWrapper';
import { UserAxios } from './axios_instances/Axios_instance';
import {jwtDecode} from 'jwt-decode'
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import AdminWrapper from './wrapper/AdminWrapper';

function App() {
  const [userInfo, setUserInfo] = useState({});

  const verifyToken = async () => {
    const access_key = localStorage.getItem('access_key');

    try {
      const response = await UserAxios.post('api/user/token/verify/', {
        token: access_key
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        const decodedToken = jwtDecode(access_key);
        setUserInfo({'access_token': access_key, 'username': decodedToken.username, 'user_id':decodedToken.user_id});
      } else {
        setUserInfo({'access_token': null,'username': null,'user_id': null});
      }

    } catch (error) {
      console.error('Token verification failed:', error);
      setUserInfo({'access_token': null,'username': null,'user_id': null});
    }

  };

  const updateUserInfo = (value) =>{
    setUserInfo(value)
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{userInfo, updateUserInfo}}>
          <Routes>
            <Route path='*' element={<UserWrapper/>} />
            <Route path='/admin/*' element={<AdminWrapper/>} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;

