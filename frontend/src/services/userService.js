import axios from 'axios';
// Set withCredentials to true for all requests
axios.defaults.withCredentials = true;


//FIXME: vite's  "import.meta.env" is not directly usable in Jest, unless configured properly
// have to mock it. Will only be able to test locally for now.
const API_URL = `http://localhost:8000`;
// const envURL = import.meta.env.VITE_ENV === 'prod'
// ? import.meta.env.VITE_REACT_APP_URL : 'http://localhost:8000';
// const API_URL = `${envURL}/api/users/`;


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