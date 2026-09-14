import React, { useState, useRef } from 'react';
import ImageFallback from './ImageFallback';
import DraggableItem from './DraggableItem';

const PupukOrganik = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dropZoneRef = useRef(null);
  
  // Game states
  const [droppedItems, setDroppedItems] = useState({
    waste: false,
    manure: false,
    probiotics: false
  });
  const [gameState, setGameState] = useState('idle'); // idle, mixing, done
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      title: "Penggilingan Sampah",
      desc: "Sampah organik dari TPS digiling menggunakan mesin penggiling khusus. Proses penggilingan ini dilakukan rutin satu kali dalam seminggu."
    },
    {
      title: "Pengeringan Limbah Ternak",
      desc: "Limbah kotoran ternak (sapi, ayam, dan peternakan lokal) dikumpulkan dari kelompok ternak mitra Desa Sarwadadi, kemudian dikeringkan secara alami agar kadar air berkurang."
    },
    {
      title: "Pencampuran Bahan",
      desc: "Bahan sampah giling, kotoran ternak, dan probiotik diaduk rata menggunakan mesin mixer. Berkat formula probiotik khusus, pupuk ini dapat langsung digunakan tanpa melalui proses fermentasi lama."
    },
    {
      title: "Pengemasan",
      desc: "Setelah tercampur sempurna, pupuk dikemas ke dalam karung/bungkus berlabel khusus untuk menjaga kualitas kelembapan pupuk."
    },
    {
      title: "Distribusi",
      desc: "Pupuk organik yang telah siap langsung dikirimkan kepada para petani lokal Desa Sarwadadi yang telah memesan."
    }
  ];

  const handleDropSuccess = (itemKey) => {
    // Urutan: Sampah Giling -> Kotoran Ternak -> Probiotik
    if (itemKey === 'manure' && !droppedItems.waste) {
      alert("Peringatan: Masukkan Sampah Giling terlebih dahulu ke dalam wadah mixer sebelum menambahkan kotoran ternak!");
      return;
    }
    if (itemKey === 'probiotics' && (!droppedItems.waste || !droppedItems.manure)) {
      alert("Peringatan: Masukkan Sampah Giling dan Kotoran Ternak terlebih dahulu sebelum menambahkan cairan probiotik!");
      return;
    }

    setDroppedItems(prev => ({
      ...prev,
      [itemKey]: true
    }));
  };

  const startMixing = () => {
    setGameState('mixing');
    setProgress(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setGameState('done');
      }
    }, 150);
  };

  const resetGame = () => {
    setDroppedItems({
      waste: false,
      manure: false,
      probiotics: false
    });
    setGameState('idle');
    setProgress(0);
  };

  const allIngredientsAdded = droppedItems.waste && droppedItems.manure && droppedItems.probiotics;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)', paddingTop: '90px' }}>
      <div className="container">
        <button className="btn btn-secondary" onClick={() => setCurrentPage('home')} style={{ marginBottom: '32px' }}>
          ← Kembali ke Beranda
        </button>

        <div className="section-header">
          <span className="badge">Ekonomi Sirkular Desa</span>
          <h2>Pupuk Organik dari TPS</h2>
          <p>Sinergi pemanfaatan limbah domestik dan peternakan untuk keberlanjutan pertanian Desa Sarwadadi.</p>
        </div>

        {/* Storytelling & Photo 1 */}
        <div className="content-split-grid">
          <div>
            <h3>Rintisan Pengolahan Sampah Sejak 2025</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Pengolahan pupuk organik di Tempat Pengolahan Sampah (TPS) Desa Sarwadadi dirintis sejak 2025. 
              Berawal dari program <strong>Kampung Bersih dari BRI</strong> secara mandiri, kemudian didukung oleh Pemerintah Desa Sarwadadi 
              dan DLH (Dinas Lingkungan Hidup). Kegiatan ini mendaur ulang sampah warga agar berdaya guna kembali.
            </p>
          </div>
          <ImageFallback 
            src="/images/halaman_tps.jpg" 
            fallbackEmoji="🏢" 
            caption="Halaman TPS Desa Sarwadadi" 
            alt="Halaman TPS Desa Sarwadadi"
          />
        </div>

        {/* Bahan & Photo 2 */}
        <div className="content-split-grid reverse-on-desktop">
          <ImageFallback 
            src="/images/mesin_pencacah.jpg" 
            fallbackEmoji="⚙️" 
            caption="Mesin Pencacah Sampah Organik" 
            alt="Mesin Pencacah Sampah Organik"
          />
          <div>
            <h3>Bahan Baku Utama & Proses Giling</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Sampah organik basah digiling halus seminggu sekali menggunakan mesin penggiling khusus. 
              Lalu dicampur dengan kotoran ternak (sapi, ayam, dan berbagai peternakan lokal) kering dari kelompok ternak mitra, 
              serta ditambahkan cairan probiotik pengurai aktif.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
              <span className="badge">Sampah TPS Terpilih</span>
              <span className="badge">Kotoran Ternak (Sapi, Ayam & Peternakan Lokal)</span>
              <span className="badge">Cairan Probiotik</span>
            </div>
          </div>
        </div>

        {/* Alur Visual */}
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>Alur Aliansi Pangan</h3>
          <div className="flow-diagram">
            <div className="flow-node">Sampah Organik TPS</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">Kotoran Ternak (Sapi & Ayam)</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">Probiotik Pengurai</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">Pupuk Organik Jadi</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">Petani Sarwadadi</div>
          </div>
        </div>

        {/* Interactive Stepper */}
        <div style={{ margin: '60px 0' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.7rem' }}>Langkah-Langkah Produksi</h3>
          <div className="stepper">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="step-item"
                onClick={() => setActiveStep(idx)}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="step-badge"
                  style={{ 
                    backgroundColor: activeStep === idx ? 'var(--primary-green)' : 'var(--primary-light)',
                    transform: activeStep === idx ? 'scale(1.3)' : 'none'
                  }}
                ></div>
                <div 
                  className="step-content"
                  style={{
                    borderLeft: activeStep === idx ? '4px solid var(--primary-green)' : '1px solid var(--border-color)',
                    backgroundColor: activeStep === idx ? '#f5f9f6' : 'var(--bg-white)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div className="step-num">LANGKAH {idx + 1}</div>
                  <h4>{step.title}</h4>
                  {activeStep === idx && (
                    <p style={{ marginTop: '12px', animation: 'fadeIn 0.4s ease', lineHeight: '1.6' }}>
                      {step.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo 3 */}
        <div className="content-split-grid">
          <div>
            <h3>Dampak Nyata Untuk Petani Lokal</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Formula pupuk yang langsung dicampur probiotik menghilangkan kewajiban fermentasi/pengomposan lama. 
              Pupuk langsung dibeli dan dimanfaatkan oleh petani Desa Sarwadadi, membantu menyuburkan tanah pertanian secara efisien dan murah.
            </p>
          </div>
          <ImageFallback 
            src="/images/pupuk_jadi.jpg" 
            fallbackEmoji="📦" 
            caption="Pupuk Organik Siap Pakai" 
            alt="Pupuk Organik Jadi"
          />
        </div>

        {/* DRAG & DROP GAME COMPOSTING (TOUCH & MOUSE FRIENDLY) */}
        <div className="custom-card game-container-card" style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary-green)', color: 'white' }}>Simulasi Interaktif</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mendukung Sentuhan HP & Mouse</span>
          </div>
          
          <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Simulasi: Pengolahan Pupuk Organik</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Tahan dan geser (drag) setiap bahan baku dari panel ke dalam Wadah Mesin Mixer di bawahnya.
          </p>

          {gameState === 'idle' && (
            <div className="game-layout-wrapper">
              {/* Draggable Ingredients (Top / Row on Mobile) */}
              <div className="drag-items-container">
                <DraggableItem
                  id="waste"
                  disabled={droppedItems.waste}
                  isDropped={droppedItems.waste}
                  dropZoneRef={dropZoneRef}
                  onDropSuccess={handleDropSuccess}
                >
                  <div className="drag-item-icon">🗑️</div>
                  <div className="drag-item-title">Sampah Giling</div>
                  <div className="drag-item-status">
                    {droppedItems.waste ? '✓ Sudah Masuk' : 'Tahan & Geser'}
                  </div>
                </DraggableItem>

                <DraggableItem
                  id="manure"
                  disabled={droppedItems.manure}
                  isDropped={droppedItems.manure}
                  dropZoneRef={dropZoneRef}
                  onDropSuccess={handleDropSuccess}
                >
                  <div className="drag-item-icon">🐂</div>
                  <div className="drag-item-title">Kotoran Ternak</div>
                  <div className="drag-item-status">
                    {droppedItems.manure ? '✓ Sudah Masuk' : 'Tahan & Geser'}
                  </div>
                </DraggableItem>

                <DraggableItem
                  id="probiotics"
                  disabled={droppedItems.probiotics}
                  isDropped={droppedItems.probiotics}
                  dropZoneRef={dropZoneRef}
                  onDropSuccess={handleDropSuccess}
                >
                  <div className="drag-item-icon">🧪</div>
                  <div className="drag-item-title">Probiotik</div>
                  <div className="drag-item-status">
                    {droppedItems.probiotics ? '✓ Sudah Masuk' : 'Tahan & Geser'}
                  </div>
                </DraggableItem>
              </div>

              {/* Drop Target Container (Bottom / Center) */}
              <div 
                ref={dropZoneRef}
                className={`drop-zone ${allIngredientsAdded ? 'drop-zone-ready' : ''}`}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
                  {allIngredientsAdded ? '⚙️' : '🥣'}
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Wadah Mesin Mixer Pengolah</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  {!allIngredientsAdded ? 'Lepaskan bahan baku ke dalam area wadah ini' : 'Semua bahan baku telah lengkap!'}
                </p>

                {/* Dropped items indicator badges */}
                <div className="ingredients-status-row">
                  <span className={`status-pill ${droppedItems.waste ? 'active' : ''}`}>
                    Sampah: {droppedItems.waste ? 'Siap' : 'Belum'}
                  </span>
                  <span className={`status-pill ${droppedItems.manure ? 'active' : ''}`}>
                    Kotoran Ternak: {droppedItems.manure ? 'Siap' : 'Belum'}
                  </span>
                  <span className={`status-pill ${droppedItems.probiotics ? 'active' : ''}`}>
                    Probiotik: {droppedItems.probiotics ? 'Siap' : 'Belum'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {gameState === 'idle' && allIngredientsAdded && (
            <button 
              className="btn btn-primary animate-pop" 
              onClick={startMixing} 
              style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '1rem' }}
            >
              Nyalakan Mesin Mixer Pengaduk ➔
            </button>
          )}

          {gameState === 'mixing' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'spin 1.5s infinite linear' }}>⚙️</div>
              <h4>Mengaduk Seluruh Bahan Baku...</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
                Proses homogenisasi tanpa fermentasi panjang.
              </p>
              <div style={{ width: '100%', maxWidth: '400px', margin: '20px auto 0 auto', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, backgroundColor: 'var(--primary-green)', height: '100%', transition: 'width 0.15s ease' }}></div>
              </div>
            </div>
          )}

          {gameState === 'done' && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease', padding: '24px 0' }}>
              <div className="badge-official" style={{ display: 'inline-block', marginBottom: '12px' }}>Hasil Berhasil</div>
              <h4 style={{ color: 'var(--primary-green)', fontSize: '1.4rem' }}>Pupuk Organik Siap Digunakan!</h4>
              <p style={{ color: 'var(--text-secondary)', marginTop: '10px', marginBottom: '24px', maxWidth: '550px', margin: '10px auto', lineHeight: '1.6' }}>
                Pupuk organik berhasil diolah dengan pencampuran rata, memiliki nutrisi tinggi, tidak berbau karena probiotik aktif, dan langsung siap disalurkan kepada petani Desa Sarwadadi.
              </p>
              <button className="btn btn-secondary" onClick={resetGame}>
                Ulangi Simulasi ↺
              </button>
            </div>
          )}
        </div>

        {/* Informasi Pembelian & Lokasi */}
        <div className="custom-card contact-order-card" style={{ marginBottom: '50px' }}>
          <div className="contact-order-header">
            <div>
              <span className="card-sector-tag">Informasi Pemesanan & Lokasi</span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '6px' }}>Pengolahan Pupuk Organik TPS 3R Sarwadadi</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
                Menyediakan pupuk organik bermutu tinggi untuk kebutuhan kelompok tani, perkebunan, dan masyarakat umum.
              </p>
            </div>
          </div>

          <div className="contact-order-details">
            <div className="contact-detail-item">
              <span className="contact-label">Instruksi Pembelian:</span>
              <span className="contact-value" style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>
                Bagi masyarakat atau petani yang ingin membeli pupuk organik olahan, silakan datang langsung ke lokasi TPS Desa Sarwadadi atau menghubungi kontak pengelola di bawah ini.
              </span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Kontak Pemesanan:</span>
              <span className="contact-value">+62 877-3054-8288</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Alamat / Lokasi:</span>
              <span className="contact-value">Blok Kandang, TPS 3R Desa Sarwadadi, Kec. Talun, Kab. Cirebon</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Layanan:</span>
              <span className="contact-value">Pembelian langsung di tempat dalam kemasan karung siap pakai.</span>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <a 
              href="https://wa.me/6287730548288?text=Halo%20Pengelola%20TPS%20Sarwadadi,%20saya%20tertarik%20untuk%20memesan%20pupuk%20organik."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Hubungi untuk Pemesanan (WhatsApp) ➔
            </a>
          </div>
        </div>

        {/* Kutipan Harapan Pak Agung */}
        <div className="quote-box">
          <blockquote style={{ position: 'relative', zIndex: 1 }}>
            <p className="quote-text">
              "Pengolahan pupuk organik ini diharapkan mampu mengurangi tumpukan sampah domestik di desa secara berkesinambungan. Semoga ke depannya tim TPS mendapat tambahan tenaga terampil agar permintaan pupuk organik petani lokal di Desa Sarwadadi sepenuhnya terpenuhi dan pemanfaatannya bisa meluas keluar daerah."
            </p>
            <cite className="quote-author">
              — Pak Agung, Pengelola Pengolahan Pupuk TPS Desa Sarwadadi
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default PupukOrganik;
