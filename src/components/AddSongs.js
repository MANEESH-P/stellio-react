import React from 'react';
import { connect } from 'react-redux';
import { addSongs } from '../redux/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    addSongs: (songs) => dispatch(addSongs(songs)),
  };
};

function AddSongs(props) {
  const { addSongs } = props;
  const handleAddSongs = (e) => {
    addSongs(e.currentTarget.files);
  };

  return (
    <label
      htmlFor='song-input'
      className='absolute bottom-0 right-0 mr-10 mb-24 h-10 w-10 bg-white flex justify-center items-center rounded-full cursor-pointer'
    >
      <input
        className='hidden'
        id='song-input'
        onChange={(e) => handleAddSongs(e)}
        type='file'
        multiple
        accept='audio/mp3'
      />
      +
    </label>
  );
}

export default connect(null, mapDispatchToProps)(AddSongs);
