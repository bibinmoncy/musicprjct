import { CirclePlay, CirclePause } from 'lucide-react';
import usePlayerStore from '../components/music_components/UsePlayerStore';

const PlayPause = ({ song }) => {
  const { activeSong, isPlaying, playSong, pauseSong } = usePlayerStore();

  const isActiveSong = activeSong?.id === song.id;

  const handlePlayClick = () => {
    if (song) {
      playSong(song); // This calls playSong from the store
    }
  };

  return isPlaying && isActiveSong ? (
    <CirclePause
      size={35}
      className="text-gray-300"
      onClick={pauseSong} // Calls pauseSong from the store
    />
  ) : (
    <CirclePlay
      size={35}
      className="text-gray-300"
      onClick={handlePlayClick} // Calls playSong when clicked
    />
  );
};

export default PlayPause;



