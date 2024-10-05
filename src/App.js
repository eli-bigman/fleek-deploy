// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboardTable'
import Graph from './components/graph'
import Header from './components/header'
import Footer from './components/footer';
import Game from './components/game'
import Compare from './components/compare'

function App() {
  return (
    <Router>
      <div className="flex-1">
        <Header /> 
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/graph" element={<Graph />} />   
            <Route path="/compare" element={<Compare />} />
            <Route path="/game" element={<Game />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;