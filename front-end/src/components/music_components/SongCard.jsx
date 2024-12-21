import PlayPause from "../PlayPause";

const SongCard = ({ song, isPlaying, activeSong, i, data, handlePlayClick, handlePauseClick }) => {

  const currentSong = data?.music_list?.[i] || song;
  const songName = currentSong?.album || "Unknown Album";
  const artistName = currentSong?.author || "Unknown Artist";
  const imageUrl =
    currentSong?.cover_large?.url_list?.[0] ||
    currentSong?.cover_medium?.url_list?.[0] ||
    currentSong?.cover_thumb?.url_list?.[0] ||
    "";

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === currentSong?.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={currentSong} 
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick}
            data={data}
            i={i}
          />
        </div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${songName} cover`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-white text-lg font-semibold truncate">{songName}</p>
        <p className="text-gray-400 text-sm truncate">{artistName}</p>
      </div>
    </div>
  );
};

export default SongCard;


