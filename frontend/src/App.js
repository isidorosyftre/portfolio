import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import About from "./components/About";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black dark:bg-gray-800 text-white font-mono text-sm flex shadow-lg transition-colors">
      <Link 
        to="/" 
        className={`px-6 py-3 transition-colors border-r border-gray-600 dark:border-gray-500 ${
          location.pathname === '/' 
            ? 'bg-white dark:bg-gray-200 text-black dark:text-gray-900' 
            : 'hover:bg-gray-800 dark:hover:bg-gray-700'
        }`}
      >
        WORK
      </Link>
      <Link 
        to="/about" 
        className={`px-6 py-3 transition-colors ${
          location.pathname === '/about' 
            ? 'bg-white dark:bg-gray-200 text-black dark:text-gray-900' 
            : 'hover:bg-gray-800 dark:hover:bg-gray-700'
        }`}
      >
        ABOUT
      </Link>
    </nav>
  );
};

function App() {
  return (
    <div className="App font-mono">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;