import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import { mockSiteData } from "./data/mockData";
import { getDarkMode, setDarkMode, initializeDarkMode } from "./utils/darkMode";

const Navigation = ({ hideNavigation, siteData }) => {
  const location = useLocation();
  
  if (hideNavigation) return null;
  
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black dark:bg-black text-white font-mono text-sm flex shadow-lg transition-colors border border-white">
      <Link 
        to="/" 
        className={`px-6 py-3 transition-colors border-r border-white ${
          location.pathname === '/' 
            ? 'bg-white text-black' 
            : 'hover:bg-gray-800'
        }`}
      >
        WORK
      </Link>
      <Link 
        to="/about" 
        className={`px-6 py-3 transition-colors ${
          location.pathname === '/about' 
            ? 'bg-white text-black' 
            : 'hover:bg-gray-800'
        }`}
      >
        ABOUT
      </Link>
    </nav>
  );
};

function App() {
  const [siteData, setSiteData] = useState(mockSiteData);
  const [hideNavigation, setHideNavigation] = useState(false);

  useEffect(() => {
    // Initialize dark mode on app start
    initializeDarkMode();
  }, []);

  return (
    <div className="App font-mono">
      <BrowserRouter>
        <Navigation hideNavigation={hideNavigation} siteData={siteData} />
        <Routes>
          <Route path="/" element={<Portfolio setHideNavigation={setHideNavigation} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;