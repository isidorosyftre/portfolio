import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import About from "./components/About";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-4 left-4 z-50 bg-black text-white px-6 py-3 font-mono text-sm flex space-x-6 shadow-lg animate-slide-in">
      <Link 
        to="/" 
        className={`hover:text-gray-300 transition-colors ${location.pathname === '/' ? 'text-gray-300' : ''}`}
      >
        PORTFOLIO
      </Link>
      <Link 
        to="/about" 
        className={`hover:text-gray-300 transition-colors ${location.pathname === '/about' ? 'text-gray-300' : ''}`}
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