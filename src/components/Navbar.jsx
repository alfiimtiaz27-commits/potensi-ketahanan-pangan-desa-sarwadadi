import React, { useState, useEffect } from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo-link" style={{ cursor: 'pointer' }} onClick={() => navigateTo('home')}>
          <div className="logo-icon">DS</div>
          <span className="logo-text">Desa Sarwadadi</span>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <button 
              className={`nav-btn-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Beranda
            </button>
          </li>
          <li>
            <button 
              className={`nav-btn-link ${currentPage === 'pupuk' ? 'active' : ''}`}
              onClick={() => navigateTo('pupuk')}
            >
              Pupuk Organik
            </button>
          </li>
          <li>
            <button 
              className={`nav-btn-link ${currentPage === 'hidroponik' ? 'active' : ''}`}
              onClick={() => navigateTo('hidroponik')}
            >
              Hidroponik
            </button>
          </li>
          <li>
            <button 
              className={`nav-btn-link ${currentPage === 'petelur' ? 'active' : ''}`}
              onClick={() => navigateTo('petelur')}
            >
              Ayam Petelur
            </button>
          </li>
          <li>
            <button 
              className={`nav-btn-link ${currentPage === 'akuaponik' ? 'active' : ''}`}
              onClick={() => navigateTo('akuaponik')}
            >
              Akuaponik
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
