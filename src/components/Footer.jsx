import React from 'react';

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <h3>Ketahanan Pangan Sarwadadi</h3>
            <p>
              Website ini merupakan media informasi, branding, serta edukasi mengenai potensi 
              dan pengelolaan ketahanan pangan lokal di Desa Sarwadadi. Menggabungkan pengolahan 
              sampah organik dengan budidaya tanaman modern untuk mendorong kemandirian pangan 
              dan ekonomi sirkular desa.
            </p>
          </div>
          
          <div className="footer-links-col">
            <h4>Navigasi</h4>
            <ul>
              <li><button className="footer-btn-link" onClick={() => setCurrentPage('home')}>Beranda</button></li>
              <li><button className="footer-btn-link" onClick={() => setCurrentPage('pupuk')}>Pupuk Organik</button></li>
              <li><button className="footer-btn-link" onClick={() => setCurrentPage('hidroponik')}>Hidroponik</button></li>
              <li><button className="footer-btn-link" onClick={() => setCurrentPage('petelur')}>Ayam Petelur</button></li>
              <li><button className="footer-btn-link" onClick={() => setCurrentPage('akuaponik')}>Akuaponik</button></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p style={{ fontWeight: 600, color: 'white', marginBottom: '8px' }}>
            Program Kerja Individu KKM Universitas Muhammadiyah Cirebon 2026
          </p>
          <p>
            Desa Sarwadadi, Kecamatan Talun, Kabupaten Cirebon
          </p>
          <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} KKM UMC Sarwadadi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
