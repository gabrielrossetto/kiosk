import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KioskList from './components/KioskList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<KioskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
