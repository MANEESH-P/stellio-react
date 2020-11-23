import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { playSong, togglePlaying } from '../redux/actions';
import defaultThumbnail from '../assets/defaultThumbnail.svg';
import '../styles/progressBar.css';
const jsmediatags = require('jsmediatags');

const mapDispatchToProps = (dispatch) => ({
  playSong: (id) => dispatch(playSong(id)),
  togglePlaying: () => dispatch(togglePlaying()),
});

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

const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState,
});

const mSet = () => {
  var aud = document.getElementById('player');
  var dur = document.getElementById('slider');
  aud.currentTime = dur.value;
};

function PlayControls(props) {
  const { songs, playState, playSong, togglePlaying } = props;
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  useEffect(() => {
    var dur = document.getElementById('slider');
    dur.value = 0;
  }, []);

  useEffect(() => {
    let tags = {};
    if (songs.length > 0) {
      jsmediatags.read(songs[playState.songId], {
        onSuccess: function (tag) {
          tags = tag;
          let url = getThumbnailUrl(tags);
          setThumbnailUrl(url);
        },
        onError: function (error) {
          console.log(error);
        },
      });
    }
  }, [playState]);
  return (
    <div
      class='absolute bottom-0 h-24 w-full bg-gray-800 flex items-center p-4 shadow-2xl'
      style={{ backgroundColor: '#222330' }}
    >
      <div class='hidden md:flex w-1/6 items-center pr-4'>
        <div class='w-1/3 mr-2'>
          {thumbnailUrl ? (
            <img class='h-16 w-16' src={thumbnailUrl}></img>
          ) : (
            <img class='h-16 w-16' src={defaultThumbnail}></img>
          )}
        </div>
        <div class='text-white w-2/3 '>
          <p class='text-sm'>
            {songs.length > 0
              ? songs[playState.songId].name.substring(0, 25) + '...'
              : 'Unknown'}
          </p>
          {/* <p class='text-xs text-gray-600'>Imagine Dragons</p> */}
        </div>
      </div>

      <div class='flex w-5/6 justify-center sm:justify-between items-center flex-grow'>
        <div class='hidden sm:flex w-1/4 flex-col text-white'>
          <p class='text-xs pb-1 text-gray-600'>PREVIOUS</p>
          <p class='text-xs'>
            {songs.length > 0
              ? songs[
                  playState.songId > 0 ? playState.songId - 1 : songs.length - 1
                ].name.substring(0, 25) + '...'
              : 'Unknown'}
          </p>
        </div>
        <div class='flex flex-col w-full sm:w-2/4 text-white items-center'>
          <div className='flex items-center mb-2'>
            <span className='w-6 h-6 mr-10 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={() =>
                  playSong(
                    playState.songId > 0
                      ? (playState.songId - 1) % songs.length
                      : songs.length - 1
                  )
                }
              >
                <path d='M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z' />
              </svg>
            </span>
            <span className='w-10 h-10 mr-10 cursor-pointer'>
              {!playState.playing ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  onClick={() => playSong(playState.songId)}
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  onClick={togglePlaying}
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </span>
            <span className='w-6 h-6 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={() => playSong((playState.songId + 1) % songs.length)}
              >
                <path d='M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z' />
              </svg>
            </span>
          </div>
          <input
            className=' progress w-full mt-2 bg-white'
            id='slider'
            type='range'
            name='rng'
            min='0'
            step='0.25'
            onChange={mSet}
          ></input>
        </div>
        <div class='hidden sm:flex w-1/4 flex-col text-white text-right'>
          <p class='text-xs pb-1 text-gray-600'>UP NEXT</p>
          <p class='text-xs'>
            {songs.length > 0
              ? songs[(playState.songId + 1) % songs.length].name.substring(
                  0,
                  25
                ) + '...'
              : 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayControls);
