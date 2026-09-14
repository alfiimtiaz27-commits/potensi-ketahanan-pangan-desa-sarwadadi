import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PupukOrganik from './components/PupukOrganik';
import Hidroponik from './components/Hidroponik';
import AyamPetelur from './components/AyamPetelur';
import Akuaponik from './components/Akuaponik';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when changing pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === 'home' && <Hero setCurrentPage={setCurrentPage} />}
        {currentPage === 'pupuk' && <PupukOrganik setCurrentPage={setCurrentPage} />}
        {currentPage === 'hidroponik' && <Hidroponik setCurrentPage={setCurrentPage} />}
        {currentPage === 'petelur' && <AyamPetelur setCurrentPage={setCurrentPage} />}
        {currentPage === 'akuaponik' && <Akuaponik setCurrentPage={setCurrentPage} />}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
