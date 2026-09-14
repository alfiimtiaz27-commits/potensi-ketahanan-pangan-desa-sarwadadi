import React, { useState, useRef } from 'react';
import ImageFallback from './ImageFallback';
import DraggableItem from './DraggableItem';

const AyamPetelur = ({ setCurrentPage }) => {
  const dropZoneRef = useRef(null);

  // Game states: setup (D&D), collect (picking eggs), ship, done
  const [gameStage, setGameStage] = useState('setup');
  const [droppedItems, setDroppedItems] = useState({
    feed: false,
    vaccine: false,
    vitamin: false
  });
  const [collectedCount, setCollectedCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleDropSuccess = (itemKey) => {
    // Urutan: Pakan Bergizi -> Vaksin Berkala -> Vitamin Sehat
    if (itemKey === 'vaccine' && !droppedItems.feed) {
      alert("Peringatan: Berikan Pakan Bergizi terlebih dahulu sebelum memberikan suntikan vaksin berkala!");
      return;
    }
    if (itemKey === 'vitamin' && (!droppedItems.feed || !droppedItems.vaccine)) {
      alert("Peringatan: Pastikan Pakan Bergizi dan Vaksin Berkala sudah diberikan sebelum memberikan asupan vitamin sehat!");
      return;
    }

    setDroppedItems(prev => ({
      ...prev,
      [itemKey]: true
    }));
  };

  const startCollecting = () => {
    setGameStage('collect');
  };

  const addEgg = () => {
    setCollectedCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setGameStage('ship');
        runShippingAnimation();
      }
      return next;
    });
  };

  const runShippingAnimation = () => {
    setProgress(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setGameStage('done');
      }
    }, 180);
  };

  const resetGame = () => {
    setGameStage('setup');
    setDroppedItems({
      feed: false,
      vaccine: false,
      vitamin: false
    });
    setCollectedCount(0);
    setProgress(0);
  };

  const allNeedsPlaced = droppedItems.feed && droppedItems.vaccine && droppedItems.vitamin;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)', paddingTop: '90px' }}>
      <div className="container">
        <button className="btn btn-secondary" onClick={() => setCurrentPage('home')} style={{ marginBottom: '32px' }}>
          ← Kembali ke Beranda
        </button>

        <div className="section-header">
          <span className="badge">Kemandirian Protein Desa</span>
          <h2>Peternakan Ayam Petelur</h2>
          <p>Potensi ekonomi bernilai tinggi pelopor produksi telur ayam segar di Desa Sarwadadi.</p>
        </div>

        {/* Storytelling & Photo 1: Kandang Keseluruhan */}
        <div className="content-split-grid">
          <div>
            <h3>Pionir Sejak 2006 di Wilayah Cirebon</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Peternakan ayam petelur ini dirintis sejak tahun <strong>2006</strong> oleh <strong>Royan Munaf</strong>. 
              Bermula dari membaca peluang strategis ketika belum tersedianya peternak ayam petelur di wilayah Cirebon sehingga memiliki keunggulan tanpa kompetitor langsung. 
              Dimulai dari <strong>1.000 ekor</strong> ayam, kini peternakan telah berkembang pesat menampung hingga <strong>5.000 ekor</strong> ayam petelur yang terbagi di <strong>2 cabang</strong>, yaitu di Desa Sarwadadi dan Kuningan.
            </p>
          </div>
          <ImageFallback 
            src="/images/kandang_keseluruhan.jpg" 
            fallbackEmoji="🏠" 
            caption="Kandang Peternakan Ayam Petelur" 
            alt="Peternakan Ayam Petelur Sarwadadi"
          />
        </div>

        {/* Pemeliharaan & Photo 2: Ayam Petelur */}
        <div className="content-split-grid reverse-on-desktop">
          <ImageFallback 
            src="/images/ayam_petelur.jpg" 
            fallbackEmoji="🐔" 
            caption="Populasi Ayam Petelur Produktif" 
            alt="Ayam Petelur Sarwadadi"
          />
          <div>
            <h3>Proses Pemeliharaan & Kualitas</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Untuk menghasilkan telur dengan cangkang tebal dan kualitas prima, pemeliharaan difokuskan pada manajemen kesehatan harian. 
              Ayam memerlukan waktu <strong>5 bulan</strong> sejak menetas untuk mulai memasuki masa produksi aktif. 
              Perawatan rutin wajib diiringi dengan <strong>vaksinasi berkala</strong> untuk mencegah penularan penyakit serta pemberian <strong>asupan vitamin</strong> agar produktivitas ayam tetap stabil.
            </p>
          </div>
        </div>

        {/* Distribusi & Photo 3: Telur */}
        <div className="content-split-grid">
          <div>
            <h3>Produksi Harian & Distribusi Logistik</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Setiap 1 ekor ayam produktif menghasilkan <strong>1 butir telur per hari</strong>. 
              Hasil panen didistribusikan ke berbagai sentra pasar di Cirebon. Dalam sehari, volume pengiriman telur mencapai <strong>5 kwintal (500 kg)</strong>. 
              Penyaluran kepada pedagang dilakukan dengan standar pengemasan minimal <strong>1 peti kayu</strong> telur segar.
            </p>
          </div>
          <ImageFallback 
            src="/images/telur_ayam.jpg" 
            fallbackEmoji="🥚" 
            caption="Hasil Panen Telur Segar Harian" 
            alt="Hasil Panen Telur Ayam Sarwadadi"
          />
        </div>

        {/* DRAG & DROP GAME PETERNAKAN (TOUCH & MOUSE FRIENDLY) */}
        <div className="custom-card game-container-card" style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary-green)', color: 'white' }}>Simulasi Interaktif</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mendukung Sentuhan HP & Mouse</span>
          </div>

          <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Simulasi: Manajemen Peternakan Ayam Petelur</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Beri asupan nutrisi dan perawatan berkala, kumpulkan hasil panen, lalu kirim telur ke pasar lokal.
          </p>

          <div style={{ background: 'var(--bg-white)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {gameStage === 'setup' && (
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: '8px' }}>Tahap 1: Pemenuhan Nutrisi & Kesehatan Ayam</h4>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Tahan dan geser ketiga kebutuhan di bawah ini ke Wadah Kandang Ayam.
                </p>

                <div className="game-layout-wrapper">
                  {/* Draggable items */}
                  <div className="drag-items-container">
                    <DraggableItem
                      id="feed"
                      disabled={droppedItems.feed}
                      isDropped={droppedItems.feed}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleDropSuccess}
                    >
                      <div className="drag-item-icon">🌾</div>
                      <div className="drag-item-title">Pakan Bergizi</div>
                      <div className="drag-item-status">
                        {droppedItems.feed ? '✓ Diberikan' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="vaccine"
                      disabled={droppedItems.vaccine}
                      isDropped={droppedItems.vaccine}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleDropSuccess}
                    >
                      <div className="drag-item-icon">💉</div>
                      <div className="drag-item-title">Vaksin Berkala</div>
                      <div className="drag-item-status">
                        {droppedItems.vaccine ? '✓ Disuntikkan' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="vitamin"
                      disabled={droppedItems.vitamin}
                      isDropped={droppedItems.vitamin}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleDropSuccess}
                    >
                      <div className="drag-item-icon">💊</div>
                      <div className="drag-item-title">Vitamin Sehat</div>
                      <div className="drag-item-status">
                        {droppedItems.vitamin ? '✓ Diberikan' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>
                  </div>

                  {/* Drop Zone (Coop) */}
                  <div 
                    ref={dropZoneRef}
                    className={`drop-zone ${allNeedsPlaced ? 'drop-zone-ready' : ''}`}
                  >
                    <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
                      {allNeedsPlaced ? '🐔' : '🏠'}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Kandang Ayam Petelur</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      {!allNeedsPlaced ? 'Lepaskan kebutuhan harian ke area kandang ini' : 'Kondisi ayam sehat dan siap bertelur!'}
                    </p>

                    <div className="ingredients-status-row">
                      <span className={`status-pill ${droppedItems.feed ? 'active' : ''}`}>Pakan: {droppedItems.feed ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${droppedItems.vaccine ? 'active' : ''}`}>Vaksin: {droppedItems.vaccine ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${droppedItems.vitamin ? 'active' : ''}`}>Vitamin: {droppedItems.vitamin ? 'Siap' : 'Belum'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gameStage === 'setup' && allNeedsPlaced && (
              <button 
                className="btn btn-primary animate-pop" 
                onClick={startCollecting} 
                style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '1rem' }}
              >
                Mulai Panen & Kumpulkan Telur ➔
              </button>
            )}

            {gameStage === 'collect' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Tahap 2: Pengumpulan Telur Dari Kandang</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Ketuk ikon telur di bawah untuk mengisi peti muatan panen (1 peti = 1 kwintal telur).
                </p>
                
                <button 
                  onClick={addEgg}
                  style={{ 
                    fontSize: '4rem', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    animation: 'pulse 1s infinite',
                    padding: '10px',
                    display: 'inline-block'
                  }}
                  title="Klik untuk mengambil telur"
                >
                  🥚
                </button>
                
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--primary-green)', marginTop: '16px' }}>
                  Total Terkumpul: {collectedCount} / 5 Peti (5 Kwintal)
                </div>
              </div>
            )}

            {gameStage === 'ship' && (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Tahap 3: Logistik & Distribusi Pengiriman</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Memuat 5 kwintal telur segar ke armada logistik untuk dikirim ke pedagang di Cirebon.
                </p>
                <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 20px auto', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, backgroundColor: 'var(--primary-green)', height: '100%', transition: 'width 0.2s ease' }}></div>
                </div>
                <div style={{ fontSize: '2.5rem' }}>
                  🚚
                </div>
              </div>
            )}

            {gameStage === 'done' && (
              <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease', padding: '20px 0' }}>
                <div className="badge-official" style={{ display: 'inline-block', marginBottom: '12px' }}>Distribusi Sukses</div>
                <h4 style={{ color: 'var(--primary-green)', fontSize: '1.4rem' }}>Pengiriman Telur Berhasil!</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '10px', marginBottom: '24px', maxWidth: '550px', margin: '10px auto', lineHeight: '1.6' }}>
                  Sebanyak 5 Kwintal telur ayam berkualitas prima berhasil didistribusikan ke pasar lokal Cirebon. Ketahanan pangan sektor protein hewani mandiri Desa Sarwadadi terus terjaga.
                </p>
                <button className="btn btn-primary" onClick={resetGame}>
                  Kelola Ulang Siklus ↺
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Informasi Kontak & Pemesanan */}
        <div className="custom-card contact-order-card" style={{ marginTop: '50px' }}>
          <div className="contact-order-header">
            <div>
              <span className="card-sector-tag">Informasi Pemesanan</span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '6px' }}>Sarwadadi Farm</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
                Melayani pesanan telur ayam segar berkualitas dalam jumlah eceran (peti) maupun pasokan grosir harian.
              </p>
            </div>
          </div>

          <div className="contact-order-details">
            <div className="contact-detail-item">
              <span className="contact-label">Nama Usaha:</span>
              <span className="contact-value">Sarwadadi Farm</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Kontak WhatsApp:</span>
              <span className="contact-value">0853-2247-0889</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Ketentuan Pengiriman:</span>
              <span className="contact-value">Minimal 1 Peti Kayu Standar (Pengiriman Area Cirebon)</span>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <a 
              href="https://wa.me/6285322470889?text=Halo%20Sarwadadi%20Farm,%20saya%20tertarik%20untuk%20memesan%20telur%20ayam%20segar."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Hubungi untuk Pemesanan (WhatsApp) ➔
            </a>
          </div>
        </div>

        {/* Kutipan Harapan Pak Royan Munaf */}
        <div className="quote-box">
          <blockquote style={{ position: 'relative', zIndex: 1 }}>
            <p className="quote-text">
              "Harapannya peternakan ini bisa lebih maju dan berkembang pesat ke depannya, serta mampu membuka cabang baru di mana-mana untuk memperluas ketersediaan protein hewani yang berkualitas bagi masyarakat."
            </p>
            <cite className="quote-author">
              — Royan Munaf, Owner Peternakan Ayam Petelur Sarwadadi
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AyamPetelur;
