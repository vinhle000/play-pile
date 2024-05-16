import axios from 'axios'


const envURL = import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_REACT_APP_URL : 'http://localhost:8000';
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/games`;

const gameService = {


  // Search for games on IGDB
  async searchIgdbGames(searchTerm) {
    try {
      const options = { withCredentials: true,}
      console.log(' gameService.searchIgdbGames -> Endpoint', `${API_URL}/search?q=${encodeURIComponent(searchTerm)}`)
      const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}`, options);
        if (response.data && Array.isArray(response.data.items)) {
           console.log(response.data.items);
         } else {
          console.error('Unexpected response format:', response.data);
         }
      
      return response.data;

    } catch (error) {
      console.error('Error searching IGDB for games:', error);
      throw error;
    }
  },

  async getGameById(igdbId) {
    try {
      const response = await axios.get(`${API_URL}/${igdbId}`, {withCredentials: true});
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

   async getGames(igdbIds) {
        try {
      const options = {
        withCredentials: true,
      };
      const response = await axios.post(`${API_URL}/list/`, {igdbIds}, options);  //TODO: Maybe change the 'games/query' to 'games/list' and use GET with path params
            
            if (response.data && Array.isArray(response.data.items)) {
           console.log(response.data.items);
         } else {
          console.error('Unexpected response format:', response.data);
         }
            return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }

  },


};


export default gameService;
