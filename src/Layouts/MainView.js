import React from 'react';
import SideNav from '../components/SideNav';
import NowPlaying from '../components/NowPlaying';
import SongList from '../components/SongList';
import RecentlyPlayed from '../components/RecentlyPlayed';
import PlayControls from '../components/PlayControls';
import AddSongs from '../components/AddSongs';

function MainView(props) {
  const { songs, playSong } = props;
  return (
    <div class='h-screen max-h-screen overflow-hidden min-w-full flex flex-row'>
      <SideNav />
      <div
        class='w-full md:w-5/6 bg-gray-900 p-10 '
        style={{ backgroundColor: '#191a27' }}
      >
        <div class='flex min-h-full h-full flex-wrap sm:flex-no-wrap sm:pb-20'>
          <div class='w-full sm:w-3/5 md:w-4/6 lg:w-3/4 min-h-full flex flex-col mr-0 sm:mr-5'>
            <NowPlaying />
            <SongList songs={songs} />
          </div>
          <div
            class='w-full sm:w-2/5 md:w-2/6 lg:w-1/4 hidden sm:flex flex-col overflow-y-scroll bg-gray-800 p-8 mt-8 sm:mt-0 h-56 sm:h-auto mb-32 shadow-2xl'
            style={{ backgroundColor: '#1e1f2d' }}
          >
            <RecentlyPlayed />
          </div>
        </div>
      </div>
      <PlayControls />
      <AddSongs />
    </div>
  );
}

export default MainView;
