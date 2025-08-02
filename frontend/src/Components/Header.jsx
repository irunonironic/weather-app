import React from 'react';
import { Search } from 'lucide-react';

const Header = ({ selectedTab, setSelectedTab, searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for places ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={onSearch}
          className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white/40 w-64"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
          <button 
            className={`px-4 py-1 rounded-full text-sm transition-all ${
              selectedTab === 'Today' 
                ? 'bg-white text-black font-medium' 
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setSelectedTab('Today')}
          >
            Today
          </button>
          <button 
            className={`px-4 py-1 rounded-full text-sm transition-all ${
              selectedTab === 'Week' 
                ? 'bg-white text-black font-medium' 
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setSelectedTab('Week')}
          >
            Week
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xs">°C</span>
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;