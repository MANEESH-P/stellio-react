import { togglePlaying, playSong } from '../redux/actions';

let store;
const mediaSessionEnabled = 'mediaSession' in navigator;
const addNewSong = (id) => {
  const state = store.getState();
  navigator.mediaSession.metadata = new window.MediaMetadata({
    title: state.songs[id].name,
    artist: 'Unknown',
    album: 'Unknown Albumn',
    artwork: [
      {
        src: 'icons/icon.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icons/icon.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  });
};

const addActionListeners = () => {
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    if (store) {
      const state = store.getState();
      const prevId =
        state.playState.songId === 0
          ? state.songs.length - 1
          : state.playState.songId - 1;
      store.dispatch(playSong(prevId));
    }
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    if (store) {
      const state = store.getState();
      const nextId = (state.playState.songId + 1) % state.songs.length;
      store.dispatch(playSong(nextId));
    }
  });

  navigator.mediaSession.setActionHandler('play', () => {
    if (store) store.dispatch(togglePlaying());
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    if (store) store.dispatch(togglePlaying());
  });
};
if (mediaSessionEnabled) addActionListeners();

export default {
  setStore(s) {
    store = s;
  },
  playSong(song) {
    if (mediaSessionEnabled) {
      addNewSong(song);
    }
  },
};
