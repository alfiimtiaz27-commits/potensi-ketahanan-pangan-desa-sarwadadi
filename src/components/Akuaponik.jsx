import React, { useState, useRef } from 'react';
import ImageFallback from './ImageFallback';
import DraggableItem from './DraggableItem';

const Akuaponik = ({ setCurrentPage }) => {
  const dropZoneRef = useRef(null);
  const ecosystemZoneRef = useRef(null);

  // Game states: 'build', 'ecosystem', 'circulate', 'done'
  const [gameStage, setGameStage] = useState('build');

  // Build stage items
  const [towerParts, setTowerParts] = useState({
    base: false,
    tank: false,
    top: false
  });

  // Ecosystem stage items
  const [ecoParts, setEcoParts] = useState({
    fish: false,
    plants: false
  });

  // Circulation simulation
  const [isCirculating, setIsCirculating] = useState(false);
  const [circulateCount, setCirculateCount] = useState(0);

  const plantList = [
    { name: "Kangkung", desc: "Pertumbuhan sangat cepat dan adaptif dengan aliran air kaya nutrisi kotoran ikan." },
    { name: "Pakcoy", desc: "Sayuran sawi sendok yang subur pada media tanam kerikil dan arang sekam." },
    { name: "Caisim", desc: "Sawi hijau renyah yang membutuhkan pasokan air dan sinar matahari pagi yang cukup." },
    { name: "Seledri", desc: "Sayuran aromatik dengan perakaran kuat yang menyerap nutrisi air secara optimal." },
    { name: "Daun Bawang", desc: "Mudah dibudidayakan secara vertikal dengan daya tahan tinggi terhadap cuaca." }
  ];

  const fishList = [
    { name: "Ikan Lele", desc: "Daya tahan sangat tinggi, toleran terhadap fluktuasi air, dan kaya protein hewani." },
    { name: "Ikan Sepat", desc: "Ikan air tawar lokal yang mudah beradaptasi di wadah galon dan ramah pakan alami." },
    { name: "Ikan Betok", desc: "Kuat terhadap perubahan suhu lingkungan dan minim risiko penyakit." },
    { name: "Ikan Cupang", desc: "Alternatif ikan hias tangguh yang dapat mempercantik tampilan akuaponik pekarangan." }
  ];

  const handleBuildDrop = (itemKey) => {
    // Sequential checking: Base -> Tank -> Top
    if (itemKey === 'tank' && !towerParts.base) {
      alert("Pasang Kaki & Galon Bawah (Stop Kran) terlebih dahulu sebagai penopang!");
      return;
    }
    if (itemKey === 'top' && !towerParts.tank) {
      alert("Pasang Badan Galon Wadah Ikan terlebih dahulu sebelum wadah tanaman atas!");
      return;
    }

    setTowerParts(prev => ({
      ...prev,
      [itemKey]: true
    }));
  };

  const handleEcoDrop = (itemKey) => {
    setEcoParts(prev => ({
      ...prev,
      [itemKey]: true
    }));
  };

  const allTowerBuilt = towerParts.base && towerParts.tank && towerParts.top;
  const allEcoPlaced = ecoParts.fish && ecoParts.plants;

  const triggerCirculation = () => {
    setIsCirculating(true);
    setTimeout(() => {
      setIsCirculating(false);
      setCirculateCount(prev => {
        const next = prev + 1;
        if (next >= 3) {
          setGameStage('done');
        }
        return next;
      });
    }, 1800);
  };

  const resetGame = () => {
    setGameStage('build');
    setTowerParts({
      base: false,
      tank: false,
      top: false
    });
    setEcoParts({
      fish: false,
      plants: false
    });
    setIsCirculating(false);
    setCirculateCount(0);
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-color)', paddingTop: '90px' }}>
      <div className="container">
        <button className="btn btn-secondary" onClick={() => setCurrentPage('home')} style={{ marginBottom: '32px' }}>
          ← Kembali ke Beranda
        </button>

        <div className="section-header">
          <span className="badge">Inovasi KKN UMC 2026</span>
          <h2>Akuaponik Tower Galon</h2>
          <p>Sistem budidaya vertikal ikan dan sayuran ramah lingkungan tanpa pompa listrik berbasis galon bekas di Desa Sarwadadi.</p>
        </div>

        {/* Status Program Pemberdayaan */}
        <div style={{
          backgroundColor: '#e8f5e9',
          border: '1px solid #c8e6c9',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{ fontSize: '1.8rem' }}>💡</div>
          <div style={{ fontSize: '0.92rem', color: 'var(--primary-dark)', lineHeight: '1.6' }}>
            <strong>Status Program:</strong> Inovasi ini merupakan bagian dari program kerja kelompok <strong>KKN / Pemberdayaan Masyarakat Universitas Muhammadiyah Cirebon 2026</strong> di Desa Sarwadadi sebagai percontohan teknologi tepat guna sederhana untuk ketahanan pangan keluarga.
          </div>
        </div>

        {/* Konsep Utama & Photo 1 */}
        <div className="content-split-grid">
          <div>
            <h3>Konsep Akuaponik Tower Galon</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Akuaponik Tower Galon merupakan sistem budidaya ikan dan sayuran secara terintegrasi vertikal dengan memanfaatkan <strong>2–3 buah galon bekas Le Minerale</strong>.
              Sistem ini dirancang sangat sederhana, hemat tempat, dan <strong>tidak memerlukan pompa listrik</strong> sehingga sepenuhnya bebas biaya energi harian.
            </p>
          </div>
          <ImageFallback
            src="/images/akuaponik_jadi.jpg"
            fallbackEmoji="🌿"
            caption="Foto Unit Jadi Akuaponik Tower Galon"
            alt="Unit Jadi Akuaponik Tower Galon"
          />
        </div>

        {/* Struktur & Detail Bagian */}
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '12px', fontSize: '1.6rem' }}>Struktur & Detail Bagian Tower</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '32px', maxWidth: '650px', margin: '0 auto 32px auto' }}>
            Rancang bangun vertikal yang mengintegrasikan filtrasi kain flanel di bagian atas dan sistem stop kran di bagian dasar.
          </p>

          <div className="content-split-grid" style={{ marginBottom: '30px' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'var(--bg-white)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-green)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--primary-dark)' }}>1. Bagian Atas: Pemasangan Kain Flanel & Media Tanam</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    Pada tahap awal perakitan wadah atas (potongan kepala galon yang dibalik), <strong>dipasangi kain flanel</strong> pada bagian leher/dasar potongan galon. Kain flanel ini berfungsi krusial sebagai <em>sumbu kapiler</em> untuk menyerap kelembapan air serta menjadi penyaring partikel alami sebelum wadah diisi media kerikil dan arang sekam.
                  </p>
                </div>
                <div style={{ background: 'var(--bg-white)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-green)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--primary-dark)' }}>2. Bagian Tengah: Wadah Hidup Ikan</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    Badan galon difungsikan sebagai wadah pemeliharaan ikan air tawar, dilengkapi lubang ventilasi di sisi samping untuk sirkulasi udara dan pemberian pakan harian.
                  </p>
                </div>
                <div style={{ background: 'var(--bg-white)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-green)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--primary-dark)' }}>3. Bagian Bawah: Pemasangan Stop Kran & Kaki Penopang</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    Pada bagian dasar wadah dipasangi <strong>stop kran (keran mini)</strong> yang diberi seal tape rapat agar tidak bocor, serta ditopang rangka kaki kokoh untuk mempermudah pengambilan air nutrisi kotoran ikan saat menyiram tanaman atas.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 Photos for Top & Bottom Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <ImageFallback
                src="/images/bagian_atas_flanel.jpg"
                fallbackEmoji="🪴"
                caption="Bagian Atas (Pemasangan Kain Flanel & Media)"
                alt="Bagian Atas Akuaponik dengan Kain Flanel"
              />
              <ImageFallback
                src="/images/bagian_bawah_keran.jpg"
                fallbackEmoji="🚰"
                caption="Bagian Bawah (Pemasangan Stop Kran & Kaki)"
                alt="Bagian Bawah Akuaponik dengan Keran"
              />
            </div>
          </div>
        </div>

        {/* Alur Cara Kerja */}
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '1.6rem' }}>Cara Kerja Sirkulasi Manual Berbasis Keran</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px' }}>
            Siklus tertutup alami antara metabolisme ikan dan penyerapan hara oleh akar tanaman.
          </p>
          <div className="flow-diagram">
            <div className="flow-node">1. Ikan di Wadah Bawah</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">2. Buka Keran Air Nutrisi</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">3. Siram Tanaman Atas</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">4. Filtrasi Alami Media</div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">5. Air Jernih Kembali</div>
          </div>
        </div>

        {/* Bahan-Bahan Pembuatan */}
        <div className="custom-card" style={{ padding: '32px', marginBottom: '50px', backgroundColor: 'var(--bg-white)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Bahan Utama Pembuatan</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              • Galon bekas Le Minerale (2–3 buah)
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              • Stop kran / keran mini
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              • Seal tape & isolasi anti bocor
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              • Perekat sambungan galon
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              • Media kerikil & arang sekam
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              • Benih sayuran & bibit ikan air tawar
            </div>
          </div>
        </div>

        {/* Rekomendasi Tanaman & Ikan */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.7rem' }}>Rekomendasi Komoditas Tanaman & Ikan</h3>
          <div className="content-split-grid">
            {/* Tanaman Card */}
            <div className="custom-card">
              <span className="card-sector-tag">Sayuran Daun</span>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Rekomendasi Tanaman</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plantList.map((p, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', background: 'var(--bg-color)', borderRadius: '6px' }}>
                    <strong>{p.name}:</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ikan Card */}
            <div className="custom-card">
              <span className="card-sector-tag">Biota Air Tawar</span>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Rekomendasi Ikan</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {fishList.map((f, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', background: 'var(--bg-color)', borderRadius: '6px' }}>
                    <strong>{f.name}:</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo 3: Close up tanaman + ikan */}
        <div className="content-split-grid" style={{ marginBottom: '50px' }}>
          <ImageFallback
            src="/images/detail_tanaman_ikan.jpg"
            fallbackEmoji="🐟"
            caption="Simbiosis Tanaman & Ikan Akuaponik"
            alt="Detail Tanaman dan Ikan Akuaponik"
          />
          <div>
            <h3>Keunggulan Akuaponik Galon</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.98rem' }}>
              <li><strong>Nol Konsumsi Listrik:</strong> Tidak memerlukan mesin pompa air maupun aerator listrik.</li>
              <li><strong>Daur Ulang Sampah Galon:</strong> Mengubah limbah plastik galon bekas menjadi sarana produksi pangan.</li>
              <li><strong>Efisiensi Lahan Vertikal:</strong> Sangat ideal untuk pekarangan sempit perumahan atau teras warga.</li>
              <li><strong>Pangan Ganda:</strong> Menghasilkan sayuran organik segar sekaligus ikan konsumsi bergizi tinggi.</li>
            </ul>
          </div>
        </div>

        {/* DRAG & DROP GAME: SIMULASI PERAKITAN AKUAPONIK (TOUCH & MOUSE FRIENDLY) */}
        <div className="custom-card game-container-card" style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--primary-green)', color: 'white' }}>Simulasi Interaktif</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mendukung Sentuhan HP & Mouse</span>
          </div>

          <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>Simulasi: Perakitan & Operasional Tower Akuaponik</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Pelajari tahapan merakit struktur tower galon bertingkat, mengisi ekosistem ikan & tanaman, dan mengoperasikan sirkulasi air keran.
          </p>

          <div style={{ background: 'var(--bg-white)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>

            {/* STAGE 1: TOWER ASSEMBLY */}
            {gameStage === 'build' && (
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: '8px' }}>Tahap 1: Susun Struktur Tower Galon Secara Berurutan</h4>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Geser komponen: 1) Kaki Bawah & Kran ➔ 2) Badan Wadah Ikan ➔ 3) Kepala Wadah Tanaman ke area perakitan.
                </p>

                <div className="game-layout-wrapper">
                  <div className="drag-items-container">
                    <DraggableItem
                      id="base"
                      disabled={towerParts.base}
                      isDropped={towerParts.base}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleBuildDrop}
                    >
                      <div className="drag-item-icon">🚰</div>
                      <div className="drag-item-title">1. Kaki & Stop Kran</div>
                      <div className="drag-item-status">
                        {towerParts.base ? '✓ Terpasang' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="tank"
                      disabled={towerParts.tank}
                      isDropped={towerParts.tank}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleBuildDrop}
                    >
                      <div className="drag-item-icon">🛢️</div>
                      <div className="drag-item-title">2. Wadah Galon Ikan</div>
                      <div className="drag-item-status">
                        {towerParts.tank ? '✓ Terpasang' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="top"
                      disabled={towerParts.top}
                      isDropped={towerParts.top}
                      dropZoneRef={dropZoneRef}
                      onDropSuccess={handleBuildDrop}
                    >
                      <div className="drag-item-icon">🪴</div>
                      <div className="drag-item-title">3. Pot Tanaman Atas</div>
                      <div className="drag-item-status">
                        {towerParts.top ? '✓ Terpasang' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>
                  </div>

                  <div
                    ref={dropZoneRef}
                    className={`drop-zone ${allTowerBuilt ? 'drop-zone-ready' : ''}`}
                  >
                    <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
                      {allTowerBuilt ? '🗼' : '🛠️'}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Area Perakitan Tower Galon</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      {!allTowerBuilt ? 'Lepaskan potongan galon secara berurutan ke area ini' : 'Struktur Tower Galon Kokoh Terpasang!'}
                    </p>

                    <div className="ingredients-status-row">
                      <span className={`status-pill ${towerParts.base ? 'active' : ''}`}>Kaki & Kran: {towerParts.base ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${towerParts.tank ? 'active' : ''}`}>Wadah Ikan: {towerParts.tank ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${towerParts.top ? 'active' : ''}`}>Pot Atas: {towerParts.top ? 'Siap' : 'Belum'}</span>
                    </div>
                  </div>
                </div>

                {allTowerBuilt && (
                  <button
                    className="btn btn-primary animate-pop"
                    onClick={() => setGameStage('ecosystem')}
                    style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '1rem' }}
                  >
                    Lanjut: Masukkan Bibit Ikan & Benih Tanaman ➔
                  </button>
                )}
              </div>
            )}

            {/* STAGE 2: ECOSYSTEM */}
            {gameStage === 'ecosystem' && (
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: '8px' }}>Tahap 2: Pengisian Ekosistem Akuaponik</h4>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Geser Bibit Ikan dan Benih Sayuran ke dalam tower akuaponik.
                </p>

                <div className="game-layout-wrapper">
                  <div className="drag-items-container">
                    <DraggableItem
                      id="fish"
                      disabled={ecoParts.fish}
                      isDropped={ecoParts.fish}
                      dropZoneRef={ecosystemZoneRef}
                      onDropSuccess={handleEcoDrop}
                    >
                      <div className="drag-item-icon">🐟</div>
                      <div className="drag-item-title">Bibit Ikan Lele/Sepat</div>
                      <div className="drag-item-status">
                        {ecoParts.fish ? '✓ Diisi' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>

                    <DraggableItem
                      id="plants"
                      disabled={ecoParts.plants}
                      isDropped={ecoParts.plants}
                      dropZoneRef={ecosystemZoneRef}
                      onDropSuccess={handleEcoDrop}
                    >
                      <div className="drag-item-icon">🌱</div>
                      <div className="drag-item-title">Benih Sayur Kangkung/Pakcoy</div>
                      <div className="drag-item-status">
                        {ecoParts.plants ? '✓ Ditanam' : 'Tahan & Geser'}
                      </div>
                    </DraggableItem>
                  </div>

                  <div
                    ref={ecosystemZoneRef}
                    className={`drop-zone ${allEcoPlaced ? 'drop-zone-ready' : ''}`}
                  >
                    <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>
                      {allEcoPlaced ? '🪴🐟' : '🗼'}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Tower Akuaponik Siap Huni</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      {!allEcoPlaced ? 'Lepaskan biota ikan dan benih sayur ke dalam tower' : 'Ekosistem akuaponik lengkap dan aktif!'}
                    </p>

                    <div className="ingredients-status-row">
                      <span className={`status-pill ${ecoParts.fish ? 'active' : ''}`}>Ikan: {ecoParts.fish ? 'Siap' : 'Belum'}</span>
                      <span className={`status-pill ${ecoParts.plants ? 'active' : ''}`}>Tanaman: {ecoParts.plants ? 'Siap' : 'Belum'}</span>
                    </div>
                  </div>
                </div>

                {allEcoPlaced && (
                  <button
                    className="btn btn-primary animate-pop"
                    onClick={() => setGameStage('circulate')}
                    style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '1rem' }}
                  >
                    Lanjut: Simulasi Sirkulasi Air Keran ➔
                  </button>
                )}
              </div>
            )}

            {/* STAGE 3: CIRCULATION */}
            {gameStage === 'circulate' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Tahap 3: Sirkulasi Nutrisi Air Berbasis Stop Kran</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Ketuk tombol di bawah untuk membuka stop kran, mengambil air kotoran ikan, lalu menyiramkannya ke pot tanaman atas (Lakukan 3 kali sirkulasi).
                </p>

                <div style={{ margin: '30px 0' }}>
                  <div style={{ fontSize: '4.5rem', animation: isCirculating ? 'pulse 0.8s infinite' : 'none' }}>
                    {isCirculating ? '💧🪴💧' : '🚰🪴'}
                  </div>
                  {isCirculating && (
                    <p style={{ color: 'var(--primary-green)', fontWeight: 700, marginTop: '12px' }}>
                      Air kotoran ikan mengalir ke atas ➔ Diserap akar & tersaring media kerikil ➔ Air jernih kembali ke ikan...
                    </p>
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
                  Siklus Sirkulasi: {circulateCount} / 3 Kali
                </div>

                <button
                  className="btn btn-primary"
                  onClick={triggerCirculation}
                  disabled={isCirculating}
                  style={{ padding: '14px 28px', fontSize: '1rem' }}
                >
                  {isCirculating ? 'Sedang Menyiram & Menyaring...' : 'Buka Keran & Siram Tanaman Atas 🚰'}
                </button>
              </div>
            )}

            {/* STAGE 4: DONE */}
            {gameStage === 'done' && (
              <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease', padding: '20px 0' }}>
                <div className="badge-official" style={{ display: 'inline-block', marginBottom: '12px' }}>Simulasi Berhasil</div>
                <h4 style={{ color: 'var(--primary-green)', fontSize: '1.4rem' }}>Tower Akuaponik Sukses Beroperasi!</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '10px', marginBottom: '24px', maxWidth: '580px', margin: '10px auto', lineHeight: '1.6' }}>
                  Sirkulasi air alami telah terbukti menyuburkan tanaman sayur di bagian atas dan menjaga air ikan tetap jernih tersaring. Teknologi tepat guna mandiri pangan keluarga berhasil diterapkan!
                </p>
                <button className="btn btn-primary" onClick={resetGame}>
                  Ulangi Simulasi ↺
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Manfaat Bagi Desa Sarwadadi & Photo 4 */}
        <div className="content-split-grid" style={{ marginBottom: '50px' }}>
          <div>
            <h3>Manfaat Bagi Masyarakat Desa Sarwadadi</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Penerapan sistem Akuaponik Tower Galon di Desa Sarwadadi membantu mengurangi tumpukan sampah plastik galon bekas di lingkungan sekaligus menjadi alternatif sumber pangan protein ikan dan serat sayuran segar keluarga secara mandiri tanpa membebani biaya tagihan listrik warga.
            </p>
          </div>
          <ImageFallback
            src="/images/tim_kkn_akuaponik.jpg"
            fallbackEmoji="👥"
            caption="Tim KKN UMC dengan Akuaponik Galon"
            alt="Foto Tim KKN Bersama Akuaponik"
          />
        </div>

        {/* Info Pelaksana KKN */}
        <div className="custom-card contact-order-card" style={{ marginBottom: '50px' }}>
          <div className="contact-order-header">
            <div>
              <span className="card-sector-tag">Program Kerja Kelompok</span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '6px' }}>Kelompok KKN Universitas Muhammadiyah Cirebon 2026</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
                Pengembangan Inovasi Teknologi Tepat Guna Bidang Ketahanan Pangan Desa Sarwadadi, Kec. Talun, Kab. Cirebon.
              </p>
            </div>
          </div>

          <div className="contact-order-details">
            <div className="contact-detail-item">
              <span className="contact-label">Status Program:</span>
              <span className="contact-value">Inovasi Percontohan Pemberdayaan Masyarakat Desa Sarwadadi</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Lokasi Penerapan:</span>
              <span className="contact-value">Desa Sarwadadi, Kecamatan Talun, Kabupaten Cirebon</span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Instagram:</span>
              <span className="contact-value">
                <a 
                  href="https://www.instagram.com/kkm41_sarwadadi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'var(--primary-green)', fontWeight: 600, textDecoration: 'none' }}
                >
                  @kkm41_sarwadadi ↗
                </a>
              </span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">TikTok:</span>
              <span className="contact-value" style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>
                KKM 41 SARWADADI UMC
              </span>
            </div>
            <div className="contact-detail-item">
              <span className="contact-label">Target Manfaat:</span>
              <span className="contact-value">Masyarakat & Pemuda Desa sebagai media edukasi teknologi budidaya pangan tepat guna.</span>
            </div>
          </div>
        </div>

        {/* Kutipan Harapan Mahasiswa KKM UMC 2026 */}
        <div className="quote-box">
          <blockquote style={{ position: 'relative', zIndex: 1 }}>
            <p className="quote-text">
              "Semoga inovasi Akuaponik Tower Galon ini dapat terus berkelanjutan dan memberikan manfaat nyata bagi ketahanan pangan keluarga masyarakat Desa Sarwadadi."
            </p>
            <cite className="quote-author">
              — Mahasiswa KKM UMC 2026 Desa Sarwadadi
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Akuaponik;
