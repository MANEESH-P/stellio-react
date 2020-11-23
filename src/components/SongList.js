import React from 'react';
import Song from './Song';
import noSongs from '../assets/noSongs2.svg';

function SongList(props) {
  const { songs, playSong } = props;
  return (
    <>
      <p class='text-gray-400 text-2xl pb-5'>Your Songs</p>
      {songs.length > 0 ? (
        <div
          class='min-w-full h-24 flex-grow sm:flex-grow bg-gray-700 overflow-scroll flex flex-wrap mb-20 sm:mb-0'
          style={{ backgroundColor: '#191a27' }}
        >
          <div class='flex w-full flex-wrap'>
            {songs.map((item, index) => {
              return (
                <Song
                  song={item}
                  id={index}
                  name={item.name}
                  key={item.lastModified}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className='min-w-full h-24 flex-grow sm:flex-grow flex-col items-center justify-center mb-20 sm:mb-0 relative text-center'>
          <div className='flex justify-center'>
            <img width='300' height='300' src={noSongs}></img>
          </div>
          <div className='mt-5'>
            <p className='text-white text-3xl font-bold'>
              <span className=''>Looks lonely here!</span>
            </p>

            <p className='text-white font-semibold'>
              <span className=''>Add your favourite songs to get started.</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SongList;
