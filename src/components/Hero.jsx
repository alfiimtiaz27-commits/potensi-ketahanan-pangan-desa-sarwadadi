import React from 'react';

const Hero = ({ setCurrentPage }) => {
  return (
    <div id="beranda" style={{ paddingTop: '70px' }}>
      {/* Hero Header with balai_desa.jpg background & gradient */}
      <section className="hero-section-official">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="badge-official">Pemerintah Desa Sarwadadi</span>
              <h1 className="hero-title">
                Ketahanan Pangan<br />
                <span className="hero-title-highlight">Desa Sarwadadi</span>
              </h1>
              <p className="subtitle">
                Digitalisasi profil potensi lokal, penguatan ekonomi sirkular, dan sarana edukasi budidaya modern berkelanjutan di Desa Sarwadadi, Kecamatan Talun, Kabupaten Cirebon.
              </p>
              <div className="hero-btns">
                <a href="#potensi" className="btn btn-primary">Lihat Program Potensi</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card-pattern">
                <div className="hero-badge-tag">Profil Program</div>
                <h3>Kemandirian Pangan</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '10px', lineHeight: '1.6' }}>
                  Integrasi pengolahan limbah organik TPS menjadi pupuk alami, budidaya sayuran hidroponik presisi, dan peternakan ayam petelur mandiri.
                </p>
                <div className="hero-stats-row">
                  <div className="hero-stat-pill">
                    <span className="pill-val">Sirkular</span>
                    <span className="pill-lbl">Pengolahan Limbah</span>
                  </div>
                  <div className="hero-stat-pill">
                    <span className="pill-val">Mandiri</span>
                    <span className="pill-lbl">Potensi Desa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pengantar Singkat */}
      <section className="section-padding" id="potensi" style={{ padding: '60px 0 100px 0' }}>
        <div className="container">
          <div className="intro-box" style={{ marginTop: 0 }}>
            <div className="intro-grid">
              <div className="intro-title">
                <h3>Sarana Edukasi & Informasi Desa</h3>
              </div>
              <div className="intro-text">
                <p>
                  Platform ini didedikasikan sebagai media edukasi, dokumentasi potensi pertanian dan peternakan,
                  serta pusat informasi program ketahanan pangan di Desa Sarwadadi,Kecamatan Talun, Kabupaten Cirebon.
                  Masyarakat dan generasi muda dapat mempelajari alur pengolahan dan melakukan simulasi interaktif secara mandiri.
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '40px' }}>
            <span className="badge">Katalog Sektor</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '8px' }}>
              Program Ketahanan Pangan Desa
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '12px auto 0 auto' }}>
              Pilih sektor di bawah ini untuk melihat profil lengkap, data wawancara pengelola, serta simulasi proses interaktif.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid-cards-responsive">
            {/* Pupuk Organik TPS */}
            <div className="custom-card card-hoverable" onClick={() => setCurrentPage('pupuk')} style={{ cursor: 'pointer' }}>
              <div className="card-sector-tag">Ekonomi Sirkular</div>
              <h3 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>Pupuk Organik TPS</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: '1.6' }}>
                Pengolahan limbah organik dan kotoran ternak dengan probiotik tanpa fermentasi lama sebagai pupuk alami petani Sarwadadi.
              </p>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }}>Pelajari & Simulasi ➔</button>
            </div>

            {/* Budidaya Hidroponik */}
            <div className="custom-card card-hoverable" onClick={() => setCurrentPage('hidroponik')} style={{ cursor: 'pointer' }}>
              <div className="card-sector-tag">Pertanian Presisi</div>
              <h3 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>Budidaya Hidroponik</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: '1.6' }}>
                Pertanian modern hemat lahan yang dirintis mandiri sejak masa pandemi COVID-19 pada tahun 2020 oleh pembudidaya lokal.
              </p>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }}>Pelajari & Simulasi ➔</button>
            </div>

            {/* Ayam Petelur */}
            <div className="custom-card card-hoverable" onClick={() => setCurrentPage('petelur')} style={{ cursor: 'pointer' }}>
              <div className="card-sector-tag">Peternakan Unggas</div>
              <h3 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>Ayam Petelur</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: '1.6' }}>
                Inovasi ketahanan protein hewani desa melalui manajemen 5.000 ayam petelur dengan pasokan harian ke Cirebon.
              </p>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }}>Pelajari & Simulasi ➔</button>
            </div>

            {/* Akuaponik */}
            <div className="custom-card card-hoverable" onClick={() => setCurrentPage('akuaponik')} style={{ cursor: 'pointer' }}>
              <div className="card-sector-tag">Inovasi KKN UMC</div>
              <h3 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>Akuaponik Tower Galon</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: '1.6' }}>
                Inovasi budidaya vertikal ikan dan sayuran tanpa pompa listrik memanfaatkan galon bekas untuk ketahanan pangan keluarga.
              </p>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '10px' }}>Pelajari & Simulasi ➔</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
