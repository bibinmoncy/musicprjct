import {create} from 'zustand';
import axios from 'axios';

const useMusicStore = create((set) => ({
  musicData: [], 
  loading: false, 
  error: null, 


  fetchMusicData: async () => {
    set({ loading: true, error: null }); 
    const options = {
      method: 'GET',
      url: 'https://scraptik.p.rapidapi.com/discover-music',
      params: { count: '48', cursor: '0' },
      headers: {
        'x-rapidapi-key': '6c71c5a1d9mshadac81c029e8738p16fbbdjsnf2676ab06e4a',
        'x-rapidapi-host': 'scraptik.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      set({ musicData: response.data, loading: false }); 
    } catch (error) {
      set({ error: error.message, loading: false }); 
    }
  },
}));

export default useMusicStore;
