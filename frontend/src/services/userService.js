import axios from 'axios';


const envURL = import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_REACT_APP_URL : 'http://localhost:8000';
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/users/`;


const register = async (username, email, password) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
    confirmPassword: password,
  }, {
    withCredentials: true,
  });
}


const login =  async(email, password) => {
  return axios.post(API_URL + 'login', {
    email,
    password,
  });
}

const logout = async (email, password) => {
  return axios.post(API_URL + 'logout', {withCredentials: true});
}


const getUserInfo = async () => {
  return axios.get(API_URL + 'me', {
    withCredentials: true,
  });

}

const userService = {
  register,
  login,
  logout,
  getUserInfo,
}
export default userService;