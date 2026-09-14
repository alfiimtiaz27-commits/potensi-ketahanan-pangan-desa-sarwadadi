import React, { useState } from 'react';

const Galeri = () => {
  const [activeFilter, setActiveFilter] = useState('semua');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      category: 'pupuk',
      title: 'Lokasi TPS & Sumber Sampah',
      desc: 'Area pengumpulan sampah domestik organik di TPS Desa Sarwadadi.',
      emoji: '🗑️',
      color: '#e8f5e9'
    },
    {
      id: 2,
      category: 'pupuk',
      title: 'Bahan Baku Kotoran Sapi',
      desc: 'Kotoran sapi kering dari peternak mitra sebelum dicampur.',
      emoji: '🐂',
      color: '#efebe9'
    },
    {
      id: 3,
      category: 'pupuk',
      title: 'Proses Pencampuran & Giling',
      desc: 'Mesin pencampur mencampur sampah organik, limbah kotoran sapi dan cairan probiotik.',
      emoji: '⚙️',
      color: '#e0f2f1'
    },
    {
      id: 4,
      category: 'pupuk',
      title: 'Pupuk Organik Siap Pakai',
      desc: 'Hasil akhir pupuk organik bertekstur gembur bebas bau menyengat.',
      emoji: '📦',
      color: '#f1f8e9'
    },
    {
      id: 5,
      category: 'hidroponik',
      title: 'Instalasi Paralon Utama',
      desc: 'Rangkaian pipa paralon tempat aliran nutrisi mengalir kontinu.',
      emoji: '🚰',
      color: '#e3f2fd'
    },
    {
      id: 6,
      category: 'hidroponik',
      title: 'Tanaman Sawi Cesim Hidroponik',
      desc: 'Pertumbuhan subur cesim dalam lubang netpot instalasi.',
      emoji: '🥬',
      color: '#e8f5e9'
    },
    {
      id: 7,
      category: 'hidroponik',
      title: 'Proses Penyemaian Dakron',
      desc: 'Benih cesim ditata rapi dalam media dakron pada tray semai.',
      emoji: '🌱',
      color: '#f1f8e9'
    },
    {
      id: 8,
      category: 'hidroponik',
      title: 'Panen Selada & Distribusi',
      desc: 'Daun selada keriting segar yang siap diantar langsung ke konsumen restoran.',
      emoji: '🥗',
      color: '#e8f5e9'
    }
  ];

  const filteredItems = activeFilter === 'semua' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="galeri" className="section-padding" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge">Dokumentasi Lapangan</span>
          <h2>Galeri & Dokumentasi</h2>
          <p>Potret langsung pengerjaan dan hasil ketahanan pangan pertanian berkelanjutan Desa Sarwadadi.</p>
        </div>

        {/* Filters */}
        <div className="gallery-filters">
          <button 
            className={`filter-btn ${activeFilter === 'semua' ? 'active' : ''}`}
            onClick={() => setActiveFilter('semua')}
          >
            Semua Foto
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'pupuk' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pupuk')}
          >
            Pupuk Organik TPS
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'hidroponik' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hidroponik')}
          >
            Hidroponik Mandiri
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => setSelectedImage(item)}
            >
              <div 
                className="gallery-img-container"
                style={{ backgroundColor: item.color }}
              >
                <div style={{ fontSize: '4rem' }}>{item.emoji}</div>
              </div>
              <div className="gallery-info">
                <span className="gallery-tag">
                  {item.category === 'pupuk' ? 'Pupuk Organik' : 'Hidroponik'}
                </span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
              <div 
                className="modal-img-container"
                style={{ backgroundColor: selectedImage.color, padding: '40px' }}
              >
                <div style={{ fontSize: '8rem', textAlign: 'center' }}>{selectedImage.emoji}</div>
              </div>
              <div className="modal-body">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.desc}</p>
                <div style={{ 
                  marginTop: '20px', 
                  fontSize: '0.85rem', 
                  color: 'var(--text-light)', 
                  borderTop: '1px solid var(--border-color)', 
                  paddingTop: '12px' 
                }}>
                  * Foto asli dokumentasi lapangan dapat disematkan di folder src/assets untuk mengganti visual ilustrasi ini.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Galeri;
