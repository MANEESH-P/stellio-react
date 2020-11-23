import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './App.css';
import '../src/styles/tailwind.output.css';
import Mainview from './Layouts/MainView';
import { togglePlaying, playSong } from './redux/actions';

let audioPlayer = null;
const mapStateToProps = (state) => ({
  songs: state.songs,
  playState: state.playState,
  repeatType: state.playState.repeat,
});

const mapDispatchToProps = (dispatch) => ({
  togglePlaying: () => dispatch(togglePlaying()),
  playSong: (id) => dispatch(playSong(id)),
});

function App(props) {
  const { songs, playState } = props;

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevPlayState = usePrevious(playState);

  useEffect(() => {
    if (songs[0]) {
      audioPlayer.src = URL.createObjectURL(songs[0]);
    }
  }, []);

  useEffect(() => {
    // if (playState.playing) {
    //   playSong(playState.songId);
    // }
    if (playState !== prevPlayState) {
      if (!playState.playing) {
        // PAUSE
        audioPlayer.pause();
      } else if (playState.songId === -1) {
        playSong(0);
      } else if (playState.songId === prevPlayState.songId) {
        // RESUME
        console.log('Should only resume');
        audioPlayer.play();
        // Start playing
      } else {
        playSong(playState.songId);
      }
    }
  }, [playState]);

  const playSong = (id) => {
    const { songs } = props;
    if (songs[id]) {
      const fileSrc = URL.createObjectURL(songs[id]);
      audioPlayer.src = fileSrc;
      audioPlayer.play();
      window.document.title = songs[id].name.replace('.mp3', '');
    }
  };

  const playNext = () => {
    const { songs, playState, playSong: play } = this.props;
    URL.revokeObjectURL(songs[playState.songId]);
    const nextSongId = (playState.songId + 1) % songs.length;
    play(nextSongId);
  };

  const songEnded = () => {
    const { songs, playState, repeatType, playSong: play } = props;
    // No repeat
    if (repeatType === 0) {
      URL.revokeObjectURL(songs[playState.songId]);
      if (playState.songId < songs.length - 1) play(playState.songId + 1);
    } else if (repeatType === 1) {
      // repeat one
      play(playState.songId);
      // repeat all
    } else playNext();
  };

  const mDur = () => {
    var aud = document.getElementById('player');
    var dur = document.getElementById('slider');
    dur.max = aud.duration;
  };
  const mPlay = () => {
    var aud = document.getElementById('player');
    var dur = document.getElementById('slider');
    dur.value = aud.currentTime;
  };

  return (
    <div className='App'>
      <audio
        hidden
        controls
        id='player'
        onEnded={songEnded}
        // onTimeUpdate={updateTime}
        ref={(audio) => {
          audioPlayer = audio;
        }}
        onLoadedMetadata={mDur}
        onTimeUpdate={mPlay}
      >
        <track kind='captions' {...{}} />
      </audio>
      <Mainview songs={songs} playSong={playSong} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
