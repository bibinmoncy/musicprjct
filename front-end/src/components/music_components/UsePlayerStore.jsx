import { create } from 'zustand';

const usePlayerStore = create((set, get) => ({
  activeSong: null,
  isPlaying: false,
  audio: null,

  
  setActiveSong: (song) => set({ activeSong: song }),

 
  setIsPlaying: (isPlaying) => set({ isPlaying }),


  playSong: (song) => {
    const { activeSong, isPlaying, audio } = get();

    
    if (audio && song.play_url?.uri !== activeSong?.play_url?.uri) {
      audio.pause(); 
      audio.currentTime = 0; 
      set({ audio: null }); 
    }

    if (!audio) {
     
      const newAudio = new Audio(song.play_url?.uri);
      set({ activeSong: song, isPlaying: true, audio: newAudio });
      
      newAudio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });

      newAudio.addEventListener('ended', () => {
        set({ isPlaying: false, audio: null }); 
      });
    } else if (!isPlaying) {
      
      audio.play();
      set({ isPlaying: true });
    }
  },

 
  pauseSong: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      set({ isPlaying: false });
    }
  },

  
  stopSong: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      set({ isPlaying: false, audio: null }); 
    }
  },
}));

export default usePlayerStore;
