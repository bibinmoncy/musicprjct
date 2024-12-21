import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import usePlayerStore from '../components/music_components/UsePlayerStore';
import useMusicStore from '../zustand/Service/shazamCoreApi';
import Error from "../components/music_components/Error";
import SongCard from "../components/music_components/SongCard";

const Discover = () => {
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playSong = usePlayerStore((state) => state.playSong);
  const pauseSong = usePlayerStore((state) => state.pauseSong);
  const { musicData, error, loading, fetchMusicData } = useMusicStore();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    fetchMusicData();
  }, [fetchMusicData]);

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPopupVisible(true);
    playSong(song.id);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    pauseSong();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-[#121286]">
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
    );
  }

  if (error) {
    return <Error title="Something went wrong..." />;
  }

  const songs = Array.isArray(musicData?.music_list) ? musicData.music_list : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#121286] text-white">
      <div className="flex flex-col justify-center items-center w-full pt-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Discover Music</h2>
          <p className="text-gray-300 mt-2 text-lg">Explore and play your favorite tracks!</p>
        </div>

        <div className="flex flex-wrap justify-between gap-8 w-full px-6">
          {songs.length > 0 ? (
            songs.map((song, i) => (
              <SongCard
                key={song.id || i}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlayClick={() => handleSongClick(song)}
                handlePauseClick={pauseSong}
              />
            ))
          ) : (
            <p className="text-gray-400 text-lg text-center w-full">No songs available</p>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupVisible && currentSong && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-10">
          <div className="bg-black rounded-lg p-6 w-4/5 max-w-3xl relative">
            <button
              className="text-white absolute top-4 right-4 text-xl"
              onClick={handleClosePopup}
            >
              ✖
            </button>
            <div className="flex flex-col items-center">
              {/* Large Music Image */}
              <div className="w-60 h-60 rounded-lg bg-gray-700 flex items-center justify-center mb-6">
                <span className="text-gray-400">No Image</span>
              </div>
              <h3 className="text-white text-2xl font-semibold">{currentSong.title || "Unknown Title"}</h3>
              <p className="text-gray-400 text-md mt-2">{currentSong.artist?.name || "Unknown Artist"}</p>

              {/* Play/Pause Button */}
              <button
                className="mt-6 text-white bg-blue-500 py-2 px-8 rounded-lg"
                onClick={isPlaying ? pauseSong : () => playSong(currentSong.id)}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
