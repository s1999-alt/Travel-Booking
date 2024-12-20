import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserWrapper from './wrapper/UserWrapper';
import { UserAxios } from './axios_instances/Axios_instance';
import {jwtDecode} from 'jwt-decode'
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import AdminWrapper from './wrapper/AdminWrapper';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

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
        setUserInfo({ 'access_token': access_key, 'username': decodedToken.username, 'user_id':decodedToken.user_id, 'is_staff':decodedToken.is_staff, 'is_superuser':decodedToken.is_superuser });
      } else {
        setUserInfo({'access_token': null, 'username': null, 'user_id': null, 'is_staff': null, 'is_superuser': null});
      }

    } catch (error) {
      console.error('Token verification failed:', error);
      setUserInfo({'access_token': null, 'username': null, 'user_id': null, 'is_staff': null, 'is_superuser': null});
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
      <ToastContainer/>
    </>
  );
}

export default App;

