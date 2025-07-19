import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import About from "./components/About";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-6 left-6 z-50 bg-black text-white font-mono text-sm flex shadow-lg">
      <Link 
        to="/" 
        className={`px-4 py-2 transition-colors border-r border-gray-600 ${
          location.pathname === '/' 
            ? 'bg-white text-black' 
            : 'hover:bg-gray-800'
        }`}
      >
        PORTFOLIO
      </Link>
      <Link 
        to="/about" 
        className={`px-4 py-2 transition-colors ${
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