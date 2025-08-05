import React from 'react';
import { Search } from 'lucide-react';

const Header = ({ selectedTab, setSelectedTab, searchQuery, setSearchQuery, onSearch }) => {
  return (

    <div className="flex items-center justify-between mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search for places ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-black placeholder-gray-400 bg-white focus:outline-none focus:border-black transition-colors"
        />

      </div>
      <div className="flex items-center gap-4">
      </div>
    </div>
  );
};

export default Header;