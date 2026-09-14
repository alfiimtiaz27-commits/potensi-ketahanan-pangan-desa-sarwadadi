import React, { useState, useRef } from 'react';
import ImageFallback from './ImageFallback';
import DraggableItem from './DraggableItem';

const Hidroponik = ({ setCurrentPage }) => {
  const dropZoneRef = useRef(null);

  // Game states: idle, setup, care, failed, harvest
  const [gameStage, setGameStage] = useState('idle');
  const [selectedCrop, setSelectedCrop] = useState('pakcoy');
  const [droppedItems, setDroppedItems] = useState({
    dakron: false,
    benih: false,
    air: false,
    nutrisi: false
  });
  const [phVal, setPhVal] = useState(6.0);
  const [ppmVal, setPpmVal] = useState(400);
  const [gameMsg, setGameMsg] = useState('');

  const crops = [
    { name: "Pakcoy", desc: "Jenis sayur populer, tumbuh cepat, dan memiliki adaptasi baik pada suhu hangat dataran rendah." },
    { name: "Seledri", desc: "Sayuran daun aromatik. Selain benih, budidaya dikembangkan dari anakan seledri yang dipisahkan." },
    { name: "Cesim", desc: "Sawi hijau berbatang renyah dengan permintaan pasar lokal harian yang stabil dan cepat panen." },
    { name: "Kangkung", desc: "Sayuran daun dengan kemampuan adaptasi tinggi pada air mengalir dan perawatan yang mudah." },
    { name: "Selada", desc: "Komoditas bernilai tinggi dengan daun keriting segar untuk kebutuhan pasokan restoran dan kuliner." }
  ];

  const selectCropToPlant = (crop) => {
    setSelectedCrop(crop);
    setGameStage('setup');
    setDroppedItems({
      dakron: false,
      benih: false,
      air: false,
      nutrisi: false
    });
    setPhVal(5.0);
    setPpmVal(400);
  };

  const handleDropSuccess = (itemKey) => {
    // Urutan: Dakron -> Benih -> Air -> Nutrisi
    if (itemKey === 'benih' && !droppedItems.dakron) {
      alert("Peringatan: Pasang media tanam Dakron terlebih dahulu ke dalam pipa sebelum menaruh benih sayur!");
      return;
    }
    if (itemKey === 'air' && (!droppedItems.dakron || !droppedItems.benih)) {
      alert("Peringatan: Pasang media Dakron dan Benih Sayur terlebih dahulu sebelum mengisi air bersih!");
      return;
    }
    if (itemKey === 'nutrisi' && !droppedItems.air) {
      alert("Peringatan: Isi wadah pipa dengan Air Bersih terlebih dahulu sebelum melarutkan Nutrisi AB Mix!");
      return;
    }

    setDroppedItems(prev => ({
      ...prev,
      [itemKey]: true
    }));
  };

  const adjustPh = (amount) => {
    setPhVal(prev => parseFloat((prev + amount).toFixed(1)));
  };

  const adjustPpm = (amount) => {
    setPpmVal(prev => Math.max(0, prev + amount));
  };

  const checkGrowth = () => {
    const isPhOk = phVal >= 5.5 && phVal <= 6.5;
    
    if (selectedCrop === 'pakcoy') {
      const isPpmOk = ppmVal >= 1000 && ppmVal <= 1200;
      if (!isPhOk) {
        setGameMsg("Tingkat pH air tidak ideal (harus di kisaran 5.5 - 6.5). Akar tanaman kesulitan menyerap zat hara.");
        setGameStage('failed');
      } else if (!isPpmOk) {
        setGameMsg(`Kepekatan nutrisi (${ppmVal} PPM) di luar batas ideal Pakcoy (Harus di rentang 1000 - 1200 PPM).`);
        setGameStage('failed');
      } else {
        setGameMsg("pH dan PPM nutrisi sangat seimbang. Pakcoy tumbuh subur, berdaun lebat, dan siap dipanen!");
        setGameStage('harvest');
      }
    } else {
      // Selada
      const isPpmOk = ppmVal >= 600 && ppmVal <= 900;
      if (!isPhOk) {
        setGameMsg("Tingkat pH air tidak ideal (harus di kisaran 5.5 - 6.5). Tanaman selada mengalami gangguan fotosintesis.");
        setGameStage('failed');
      } else if (!isPpmOk) {
        setGameMsg(`Kepekatan nutrisi (${ppmVal} PPM) di luar batas ideal Selada (Harus di rentang 600 - 900 PPM).`);
        setGameStage('failed');
      } else {
        setGameMsg("pH dan PPM nutrisi sangat presisi. Selada keriting tumbuh renyah segar dan siap dipanen!");
        setGameStage('harvest');
      }
    }
  };

  const resetGame = () => {
    setGameStage('idle');
    setGameMsg('');
  };

  const allItemsPlaced = droppedItems.dakron && droppedItems.benih && droppedItems.air && droppedItems.nutrisi;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-color)', paddingTop: '90px' }}>
      <div className="container">
        <button className="btn btn-secondary" onClick={() => setCurrentPage('home')} style={{ marginBottom: '32px' }}>
          ← Kembali ke Beranda
        </button>

        <div className="section-header">
          <span className="badge">Pertanian Presisi</span>
          <h2>Budidaya Hidroponik</h2>
          <p>Solusi bertanam modern ramah lahan yang adaptif dan bernilai ekonomi tinggi di Desa Sarwadadi.</p>
        </div>

        {/* Sejarah & Photo 1 */}
        <div className="content-split-grid">
          <div>
            <h3>Pionir Hidroponik Mandiri oleh Pak Juna (2020)</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Budidaya hidroponik di Desa Sarwadadi dirintis sejak tahun <strong>2020</strong> pada masa pandemi COVID-19 oleh <strong>Pak Juna</strong> (pemilik Juna Hidroponik). 
              Bermula dari inisiatif mandiri untuk memanfaatkan pekarangan secara produktif dan mempelajari teknik budidaya modern secara otodidak. 
              Awalnya hanya menggunakan <strong>5 paralon</strong> instalasi kecil, kini instalasi hidroponik Pak Juna terus berkembang pesat menjadi sentra produksi aneka komoditas sayuran daun segar berkualitas di Desa Sarwadadi.
            </p>
          </div>
          <ImageFallback 
            src="/images/halaman_hidroponik.jpg" 
            fallbackEmoji="🏞️" 
            caption="Halaman Budidaya Juna Hidroponik" 
            alt="Halaman Budidaya Hidroponik Sarwadadi"
          />
        </div>

        {/* Penyemaian & Photo 2 */}
        <div className="content-split-grid reverse-on-desktop">
          <ImageFallback 
            src="/images/tray_semai.jpg" 
            fallbackEmoji="🌱" 
            caption="Tray Semai Media Dakron" 
            alt="Tray Semai Hidroponik"
          />
          <div>
            <h3>Proses Penyemaian Presisi</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Penyemaian benih dilakukan menggunakan tray semai khusus dan dakron sintetis sebagai media tanam utama. 
              Khusus untuk komoditas cesim/sawi, disemai 2-3 biji per lubang dakron guna memastikan daya tumbuh yang seragam.
            </p>
          </div>
        </div>

        {/* Pilihan Tanaman */}
        <div style={{ margin: '60px 0' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.7rem' }}>Komoditas Sayuran Utama</h3>
          <div className="grid-cards-responsive">
            {crops.map((crop, idx) => (
              <div key={idx} className="custom-card plant-card">
                <div className="card-sector-tag">Varietas {idx + 1}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{crop.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{crop.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photos: Pokcoy & Selada */}
        <div className="content-split-grid" style={{ marginBottom: '60px' }}>
          <ImageFallback 
            src="/images/tanaman_pokcoy.jpg" 
            fallbackEmoji="🥬" 
            caption="Tanaman Pakcoy Hidroponik" 
            alt="Sayur Pakcoy Hidroponik"
          />
          <ImageFallback 
            src="/images/tanaman_selada.jpg" 
            fallbackEmoji="🥗" 
            caption="Tanaman Selada Hidroponik" 
            alt="Sayur Selada Hidroponik"
          />
        </div>

        {/* Waktu Panen */}
        <div className="harvest-stats-container" style={{ marginBottom: '60px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '1.6rem' }}>Estimasi Waktu Panen</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '32px', fontSize: '0.88rem' }}>
            * Catatan: Masa panen disesuaikan dengan paparan sinar matahari dan kepekatan nutrisi harian.
          </p>
          <div className="harvest-grid">
            <div className="harvest-stat-item">
              <div className="harvest-days">40-45 Hari</div>
              <div className="harvest-label">Selada</div>
              <div className="harvest-desc">Dari masa semai hingga siap petik.</div>
            </div>
            <div className="harvest-stat-item">
              <div className="harvest-days">±35 Hari</div>
              <div className="harvest-label">Cesim</div>
              <div className="harvest-desc">Dari masa semai hingga siap edar.</div>
            </div>
            <div className="harvest-stat-item">
              <div className="harvest-days">28-35 Hari</div>
              <div className="harvest-label">Pakcoy</div>
              <div className="harvest-desc">Bergantung pada varietas pakcoy.</div>
            </div>
            <div className="harvest-stat-item">
              <div className="harvest-days">Sistem Anakan</div>
              <div className="harvest-label">Seledri</div>
              <div className="harvest-desc">Pemisahan anakan rumpun rimbun.</div>
            </div>
          </div>
        </div>

        {/* DRAG & DROP GAME HIDROPONIK (TOUCH & MOUSE FRIENDLY) */}
        <div className="custom-card game-container-card" style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary-green)', color: 'white' }}>Simulasi Interaktif</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mendukung Sentuhan HP & Mouse</span>
          </div>

          <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Simulasi: Manajemen Instalasi Hidroponik</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Pelajari tahapan merakit instalasi pipa, memasang media, dan mengatur parameter nutrisi air.
          </p>

          <div style={{ background: 'var(--bg-white)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {gameStage === 'idle' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Pilih Komoditas yang Ingin Ditanam:</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Setiap sayuran memiliki kebutuhan kadar nutrisi (PPM) yang berbeda.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={() => selectCropToPlant('pakcoy')}>
                    Tanam Sayur Pakcoy
                  </button>
                  <button className="btn btn-primary" onClick={() => selectCropToPlant('selada')}>
                    Tanam Sayur Selada
                  </button>
                </div>
              </div>
            )}

            {gameStage === 'setup' && (
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: '8px' }}>
                  Tahap 1: Perakitan Instalasi Pipa ({selectedCrop === 'pakcoy' ? 'Pakcoy' : 'Selada'})
                </h4>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Tahan dan geser seluruh komponen di bawah ini ke Wadah Pipa Paralon.
                </p>

                <div className="game-layout-wrapper">
                  {/* Draggable components (Row) */}
                  <div className="drag-items-container">
                    <DraggableItem
                      id="dakron"
                      disabled={droppedItems.dakron}
                      isDropped={droppedItems.dakron}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleDropSuccess}
                    >
                      <div className="drag-item-icon">🧽</div>
                      <div className="drag-item-title">Media Dakron</div>
                      <div className="drag-item-status">
                        {droppedItems.dakron ? '✓ Terpasang' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="benih"
                      disabled={droppedItems.benih}
                      isDropped={droppedItems.benih}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleDropSuccess}
                    >
                      <div className="drag-item-icon">🌱</div>
                      <div className="drag-item-title">Benih Sayur</div>
                      <div className="drag-item-status">
                        {droppedItems.benih ? '✓ Terpasang' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="air"
                      disabled={droppedItems.air}
                      isDropped={droppedItems.air}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleDropSuccess}
                    >
                      <div className="drag-item-icon">💧</div>
                      <div className="drag-item-title">Air Bersih</div>
                      <div className="drag-item-status">
                        {droppedItems.air ? '✓ Terisi' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="nutrisi"
                      disabled={droppedItems.nutrisi}
                      isDropped={droppedItems.nutrisi}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleDropSuccess}
                    >
                      <div className="drag-item-icon">🧪</div>
                      <div className="drag-item-title">Nutrisi AB Mix</div>
                      <div className="drag-item-status">
                        {droppedItems.nutrisi ? '✓ Terisi' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>
                  </div>

                  {/* Central Paralon Drop Zone */}
                  <div 
                    ref={dropZoneRef}
                    className={`drop-zone ${allItemsPlaced ? 'drop-zone-ready' : ''}`}
                  >
                    <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
                      {allItemsPlaced ? '🌱' : '🚰'}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Wadah Pipa Paralon</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      {!allItemsPlaced ? 'Lepaskan komponen ke dalam area instalasi pipa ini' : 'Semua komponen instalasi lengkap!'}
                    </p>

                    <div className="ingredients-status-row">
                      <span className={`status-pill ${droppedItems.dakron ? 'active' : ''}`}>Dakron: {droppedItems.dakron ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${droppedItems.benih ? 'active' : ''}`}>Benih: {droppedItems.benih ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${droppedItems.air ? 'active' : ''}`}>Air: {droppedItems.air ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${droppedItems.nutrisi ? 'active' : ''}`}>Nutrisi: {droppedItems.nutrisi ? 'Siap' : 'Belum'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gameStage === 'setup' && allItemsPlaced && (
              <button 
                className="btn btn-primary animate-pop" 
                onClick={() => setGameStage('care')} 
                style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '1rem' }}
              >
                Lanjut ke Pengaturan Nutrisi & pH Air ➔
              </button>
            )}

            {gameStage === 'care' && (
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: '8px' }}>
                  Tahap 2: Kalibrasi Parameter ({selectedCrop === 'pakcoy' ? 'Pakcoy' : 'Selada'})
                </h4>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Atur nilai pH dan konsentrasi nutrisi agar sesuai rentang kebutuhan tanaman.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  {/* pH Adjuster */}
                  <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: '#f9fbe7' }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1.05rem' }}>pH Air Larutan</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '8px 0' }}>{phVal}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>Rentang Ideal: 5.5 - 6.5</p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 18px', fontSize: '1.1rem', fontWeight: 700 }} onClick={() => adjustPh(-0.1)}>-</button>
                      <button className="btn btn-secondary" style={{ padding: '6px 18px', fontSize: '1.1rem', fontWeight: 700 }} onClick={() => adjustPh(0.1)}>+</button>
                    </div>
                  </div>

                  {/* PPM Adjuster */}
                  <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: '#e3f2fd' }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1.05rem' }}>Nutrisi AB Mix (PPM)</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '8px 0' }}>{ppmVal}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                      {selectedCrop === 'pakcoy' ? 'Ideal Pakcoy: 1000 - 1200 PPM' : 'Ideal Selada: 600 - 900 PPM'}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 18px', fontSize: '1.1rem', fontWeight: 700 }} onClick={() => adjustPpm(-100)}>-</button>
                      <button className="btn btn-secondary" style={{ padding: '6px 18px', fontSize: '1.1rem', fontWeight: 700 }} onClick={() => adjustPpm(100)}>+</button>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }} onClick={checkGrowth}>
                  Periksa Pertumbuhan & Panen ➔
                </button>
              </div>
            )}

            {gameStage === 'failed' && (
              <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease', padding: '20px 0' }}>
                <div className="badge" style={{ backgroundColor: '#c62828', color: 'white', marginBottom: '12px' }}>Perlu Penyesuaian</div>
                <h4 style={{ color: '#c62828', fontSize: '1.3rem' }}>Parameter Belum Sesuai</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px', maxWidth: '550px', margin: '8px auto', lineHeight: '1.6' }}>{gameMsg}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={() => setGameStage('care')}>
                    Perbaiki Pengaturan Parameter
                  </button>
                  <button className="btn btn-secondary" onClick={resetGame}>
                    Mulai Ulang Dari Awal
                  </button>
                </div>
              </div>
            )}

            {gameStage === 'harvest' && (
              <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease', padding: '20px 0' }}>
                <div className="badge-official" style={{ display: 'inline-block', marginBottom: '12px' }}>Panen Berhasil</div>
                <h4 style={{ color: 'var(--primary-green)', fontSize: '1.4rem' }}>Tanaman Tumbuh Prima!</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '10px', marginBottom: '24px', maxWidth: '550px', margin: '10px auto', lineHeight: '1.6' }}>
                  {gameMsg} Hasil panen hidroponik berkualitas tinggi siap didistribusikan ke mitra restoran dan pedagang lokal Desa Sarwadadi.
                </p>
                <button className="btn btn-primary" onClick={resetGame}>
                  Tanam Komoditas Lain ↺
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pemanfaatan Hasil Panen */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.7rem' }}>Distribusi Hasil Panen</h3>
          <div className="content-split-grid">
            <div className="custom-card">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Komoditas Cesim & Pakcoy</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Didistribusikan kepada pedagang sayur keliling, restoran mitra, serta menjadi pasokan harian bagi pelaku UMKM penjual mi ayam dan bakso di Desa Sarwadadi.
              </p>
            </div>
            
            <div className="custom-card">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Komoditas Selada Keriting</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Fokus panen disalurkan untuk memenuhi kebutuhan sayuran segar harian bagi industri kuliner dan restoran di kawasan Cirebon sekitarnya.
              </p>
            </div>
          </div>
        </div>

        {/* Informasi Kontak & Pemesanan */}
        <div className="custom-card contact-order-card" style={{ marginBottom: '50px' }}>
          <div className="contact-order-header">
            <div>
              <span className="card-sector-tag">Informasi Pemesanan & Edukasi</span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '6px' }}>Juna Hidroponik</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
                Menyediakan aneka sayuran hidroponik segar berkualitas untuk kebutuhan harian rumah tangga, pedagang, dan restoran.
              </p>
            </div>
          </div>

          <div className="contact-order-details">
            <div className="contact-detail-item">
              <span className="contact-label">Nama Usaha:</span>
              <span className="contact-value">Juna Hidroponik</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Kontak WhatsApp:</span>
              <span className="contact-value">+62 852-9585-1584</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Media Edukasi:</span>
              <span className="contact-value">YouTube Channel @junahydrofarm</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '20px', flexWrap: 'wrap' }}>
            <a 
              href="https://wa.me/6285295851584?text=Halo%20Juna%20Hidroponik,%20saya%20tertarik%20untuk%20memesan%20sayuran%20hidroponik%20segar."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Hubungi untuk Pemesanan (WhatsApp) ➔
            </a>
            <a 
              href="https://youtube.com/@junahydrofarm?si=ZN55EwbBoHbpBavz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-youtube"
            >
              Tonton Video Edukasi YouTube ➔
            </a>
          </div>
        </div>

        {/* Kutipan Harapan Pak Juna */}
        <div className="quote-box">
          <blockquote style={{ position: 'relative', zIndex: 1 }}>
            <p className="quote-text">
              "Budidaya hidroponik ini diharapkan dapat terus bertahan, berkembang pesat untuk menyejahterakan warga Desa Sarwadadi, serta dapat diwarisi oleh generasi muda/pemuda desa agar teknik bercocok tanam modern bernilai tinggi ini lestari secara turun-temurun."
            </p>
            <cite className="quote-author">
              — Pak Juna, Pemilik Budidaya Hidroponik Sarwadadi
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Hidroponik;
