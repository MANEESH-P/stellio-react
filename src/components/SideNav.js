import React from 'react';

function SideNav() {
  return (
    <div
      class='hidden md:flex md:w-1/6 h-full sidebar flex-col pt-20 bg-gray-800 items-center'
      style={{ backgroundColor: '#2c2d3c' }}
    >
      <nav class='flex flex-col  text-sm'>
        <a class='text-gray-400 py-2'>YOUR ZONE</a>
        <a class='text-gray-600 py-2'>BROWSE</a>
        <a class='text-gray-600 py-2'>RADIO FM</a>
        <a class='text-gray-600 py-2'>PLAYLISTS</a>
        <a class='text-gray-600 py-2'>FEATURED</a>
      </nav>
      <div class='flex flex-col pt-5 pl-5 queue text-gray-400'>
        <p class='text-sm py-5'>--QUEUE----</p>
        <div class='queue-song py-2'>
          <h5 class='text-sm'>Golden Sands</h5>
          <p class='text-gray-600 text-xs'>Imagine Dragons</p>
        </div>
        <div class='queue-song py-2'>
          <h5 class='text-sm'>Neon Sound</h5>
          <p class='text-gray-600 text-xs'>AVICII</p>
        </div>
        <div class='queue-song py-2'>
          <h5 class='text-sm'>Drop the Game</h5>
          <p class='text-gray-600 text-xs'>Flame</p>
        </div>
        <div class='queue-song py-2'>
          <h5 class='text-sm'>On Hold</h5>
          <p class='text-gray-600 text-xs'>The XX</p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
