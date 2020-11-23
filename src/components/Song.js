import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { playSong, togglePlaying } from '../redux/actions';
import defaultThumbnail from '../assets/defaultThumbnail.svg';
const jsmediatags = require('jsmediatags');

const mapDispatchToProps = (dispatch) => {
  return {
    playSong: (id) => dispatch(playSong(id)),
    togglePlaying: () => dispatch(togglePlaying()),
  };
};

function Song(props) {
  const { song, name, playSong, id } = props;
  const trimmedName = name.substring(0, 20) + '...';
  const [artistName, setArtistName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const getThumbnailUrl = (tags) => {
    const picture = tags.tags.picture;
    // create reference to track art
    let base64String = '';
    if (picture) {
      for (let i = 0; i < picture.data.length; i++) {
        base64String += String.fromCharCode(picture.data[i]);
      }
      let imageUri =
        'data:' + picture.format + ';base64,' + window.btoa(base64String);
      return imageUri;
    }
    return '';
  };

  const getSongDetails = (song) => {
    let tags = {};
    jsmediatags.read(song, {
      onSuccess: function (tag) {
        tags = tag;
        let artist = tags.tags.artist;
        let url = getThumbnailUrl(tags);
        let songDetails = { artist, url };
        console.log(songDetails);
        setArtistName(songDetails.artist);
        setThumbnailUrl(songDetails.url);
      },
      onError: function (error) {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    getSongDetails(song);
  }, []);

  return (
    <div
      class='w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded p-2 mb-4 shadow-2xl'
      onClick={() => playSong(id)}
    >
      <div class='h-48 relative cursor-pointer'>
        {thumbnailUrl ? (
          <img className='h-full w-full rounded-lg' src={thumbnailUrl} />
        ) : (
          <img className='h-full w-full rounded-lg' src={defaultThumbnail} />
        )}
        <div
          class='absolute bottom-0 h-20 bg-gray-800 w-full p-4 shadow-2xl rounded-b-lg'
          style={{ backgroundColor: '#1e1f2d' }}
        >
          <p class='text-white text-xs'>{trimmedName}</p>
          <p class='text-gray-600 text-xs'>
            {artistName ? artistName : 'Unknown Artist'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Song);
