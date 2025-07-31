// components/Header.jsx
import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';

const Header = ({ onLocationSearch, currentLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Week');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onLocationSearch(searchTerm);
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search for places ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('Today')}
            className={`px-3 py-1 text-sm ${activeTab === 'Today' ? 'text-gray-900 font-medium' : 'text-gray-600'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setActiveTab('Week')}
            className={`px-3 py-1 text-sm ${activeTab === 'Week' ? 'text-gray-900 font-medium border-b-2 border-gray-900' : 'text-gray-600'}`}
          >
            Week
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;