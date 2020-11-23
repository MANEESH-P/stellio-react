import { PLAY_SONG, TOGGLE_PLAYING, REPEAT } from '../actions';

const initalState = {
  playing: false,
  songId: 0,
  repeat: 0,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SONG: {
      return { ...state, playing: true, songId: action.payload };
    }
    case TOGGLE_PLAYING: {
      return Object.assign({}, state, { playing: !state.playing });
    }
    case REPEAT: {
      return { ...state, repeat: action.payload };
    }
    default: {
      return state;
    }
  }
};
