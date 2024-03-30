import axios from 'axios'
const API_URL = `${import.meta.env.VITE_REACT_APP_URL}/api/games`;

const gameService = {


  // Search for games on IGDB
  async searchIgdbGames(searchTerm) {
    try {
      const options = { withCredentials: true,}
      console.log(' gameService.searchIgdbGames -> Endpoint', `${API_URL}/search?q=${encodeURIComponent(searchTerm)}`)
      const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}`, options);
      return response.data;

    } catch (error) {
      console.error('Error searching IGDB for games:', error);
    }
  },

  async getGameById(igdbId) {
    try {
      const response = await axios.get(`${API_URL}/${igdbId}`, {withCredentials: true});
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

   async getGames(igdbIds) {
    try {
      const options = {
        withCredentials: true,
      };
      const response = await axios.post(`${API_URL}/query`, {igdbIds}, options);  //TODO: Maybe change the 'games/query' to 'games/list'
      return response.data;
    } catch (error) {
      console.error(error);
    }

  },


};


export default gameService;
