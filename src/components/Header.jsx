import React from 'react';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='px-25 w-full h-20 shadow-md flex items-center justify-between  bg-white'>
      <div className='font-semibold text-2xl'>
        Infimatrix <br />
        <span className='font-light text-lg'>Post Manager</span>
      </div>
      <div className='relative w-full max-w-md'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search Post...'
          className=' xl:w-full sm:w-90  px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 '
        />
      </div>
    </div>
  );
};

export default Header;