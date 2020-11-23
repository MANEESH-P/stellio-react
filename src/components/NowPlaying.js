import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import defaultThumbnail from '../assets/defaultThumbnail.svg';
const jsmediatags = require('jsmediatags');

const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState,
});

function NowPlaying(props) {
  const { playState, songs } = props;
  const [currentSong, setCurrentSong] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [nextSong, setNextSong] = useState('');

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

        setArtistName(artist);
        setThumbnailUrl(url);
      },
      onError: function (error) {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    var audio = document.getElementById('player');
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById('canvas');

    let dpi = window.devicePixelRatio;

    let ctx = canvas.getContext('2d');
    let style_height = +getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);

    let style_width = +getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);

    // var ctx = canvas.getContext('2d');

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#191a27';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + 25 * (i / bufferLength);
        var g = 250 * (i / bufferLength);
        var b = 50;

        // ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        // ctx.fillStyle = `rgb(226,232,240)`;
        ctx.fillStyle = 'rgb(19,184,198)';

        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }
    audio.play();
    renderFrame();
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      getSongDetails(songs[playState.songId]);
      setCurrentSong(songs[playState.songId].name);
      setNextSong(songs[(playState.songId + 1) % songs.length].name);
    }
  }, [playState]);

  return (
    <div class='min-w-full h-48 shadow-2xl mb-10 relative'>
      <canvas className='w-full h-full pb-16' id='canvas'></canvas>
      <div class='absolute bottom-0 h-16 min-w-full flex  items-center text-gray-400 text-xs'>
        <div class='h-16 w-20 '>
          {currentSong && thumbnailUrl ? (
            <img className='h-full w-full' src={thumbnailUrl}></img>
          ) : (
            <img className='h-full w-full' src={defaultThumbnail}></img>
          )}
        </div>
        <div class='flex justify-end text-right sm:justify-between sm:text-left w-full p-2 items-center'>
          <div class='flex flex-col'>
            <p class='text-sm md:text-lg lg:text-lg'>
              {currentSong
                ? `${currentSong.substring(0, 25) + '...'}`
                : 'No song selected'}
            </p>
            <p class='text-gray-600'>
              {artistName ? artistName : 'Unknown Artist'}
            </p>
          </div>
          {currentSong && (
            <div class='text-right hidden sm:flex sm:flex-col'>
              <p class='text-gray-600'>UP NEXT</p>
              <p>{`${nextSong.substring(0, 25) + '...'}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(NowPlaying);
