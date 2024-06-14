import axios from 'axios'
import gameService from './gameService'
// Set withCredentials to true for all requests
axios.defaults.withCredentials = true;

//FIXME: vites's  "import.meta.env" is not directly usable in Jest, unless configured properly
// have to mock it. Will only be able to test locally for now.
const API_URL = `http://localhost:8000`;
// const envURL = import.meta.env.VITE_ENV === 'prod' ? import.meta.env.VITE_REACT_APP_URL : 'http://localhost:8000';
// const API_URL = `${envURL}/api/userGames`;

const userGameService = {

  async getUserPlayPileGames() {
    try {
      const response = await axios.get(`${API_URL}/playPile`, { withCredentials: true});
        // This should be an object map of the user's play games with the key being the columnId
      return response.data;
    } catch (error) {
      console.error('Error getting user play pile', error);
    }
  },

  async getUserGameByColumnIds(columnIds) {
    const body = { columnIds: columnIds };
    try {
      const response = await axios.post(`${API_URL}/column/`, body, { withCredentials: true });
        if (response.data && Array.isArray(response.data.items)) {
           console.log(response.data.items);
         } else {
          console.error('Unexpected response format:', response.data);
         }
      return response.data;
    } catch (error) {
      console.error('Error getting user game by column ids', error);
    }
  },

  async getUserGamesOnBoard() {
    try {
      const response = await axios.get(`${API_URL}/board`, { withCredentials: true });
        // This should be an object map of the user's play games with the key being the columnId
      return response.data;
    } catch (error) {
      console.error('Error getting user games on board', error);
    }
  },

  async updateUserGameData(igdbId, fields) {
    const body = fields ? { ...fields, } : {};
    try {
      const response = await axios.patch(`${API_URL}/${igdbId}`, body, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(`Error updating user's game data`, error);
    }
  },

  async updateUserGameColumnPositions(updatedColumnUserGames) {
    const body = updatedColumnUserGames;
    try {
      const response = await axios.patch(`${API_URL}/board/column/updatePositions`, body, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(`Error updating game card positions in column ${error}`)
    }
  },
};

export default userGameService;