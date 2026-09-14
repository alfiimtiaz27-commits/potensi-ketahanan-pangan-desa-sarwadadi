import React from 'react';

const Aquaponik = () => {
  return (
    <section id="aquaponik" className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge kkm">Program Kerja Kelompok KKM 2026</span>
          <h2>Sistem Aquaponik</h2>
          <p>Inovasi pertanian terintegrasi sinergi biota air dan tanaman untuk kemandirian pangan masa depan.</p>
        </div>

        {/* Warning/Clarification Alert */}
        <div style={{
          backgroundColor: '#fff3e0',
          borderLeft: '4px solid #ff9800',
          padding: '20px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '40px',
          color: '#e65100'
        }}>
          <strong>PENTING:</strong> Halaman ini memuat informasi mengenai <strong>rencana program kerja kelompok mahasiswa KKM Universitas Muhammadiyah Cirebon 2026</strong> yang akan segera diimplementasikan di Desa Sarwadadi. Sistem ini belum berjalan secara umum di masyarakat sebelum dilaksanakannya program KKM ini.
        </div>

        <div className="aquaponik-container">
          {/* Info Side */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Apa itu Aquaponik?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Aquaponik adalah sistem pertanian berkelanjutan yang mengombinasikan budidaya hewan air (akuakultur) dengan budidaya tanaman tanpa tanah (hidroponik) dalam satu ekosistem yang saling menguntungkan.
            </p>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Tujuan Rencana Program</h3>
            <ul style={{ 
              listStyle: 'none', 
              color: 'var(--text-secondary)', 
              marginBottom: '30px',
              paddingLeft: 0
            }}>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--primary-green)' }}>✔</span> 
                Menjadi percontohan (demplot) teknologi tani hemat air dan lahan bagi warga desa.
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--primary-green)' }}>✔</span> 
                Meningkatkan variasi produksi pangan bergizi (protein ikan & vitamin sayur) dalam satu waktu.
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--primary-green)' }}>✔</span> 
                Mengedukasi pemuda desa mengenai inovasi pertanian berbasis ekologi modern.
              </li>
            </ul>
          </div>

          {/* Diagram Side */}
          <div className="aquaponik-diagram-card">
            <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.3rem' }}>Siklus Simbiosis Mutualisme</h3>
            <div className="aq-cycle">
              <div className="aq-node">
                <span className="aq-node-icon">🐟</span>
                <div className="aq-node-text">
                  <h4>1. Pemeliharaan Ikan</h4>
                  <p>Ikan diberi pakan dan menghasilkan kotoran yang mengandung ammonia tinggi.</p>
                </div>
              </div>
              
              <div className="aq-arrow">⬇</div>
              
              <div className="aq-node">
                <span className="aq-node-icon">🦠</span>
                <div className="aq-node-text">
                  <h4>2. Mikroba Pengurai</h4>
                  <p>Bakteri alami mengubah ammonia berbahaya menjadi nutrisi yang siap diserap tanaman.</p>
                </div>
              </div>
              
              <div className="aq-arrow">⬇</div>
              
              <div className="aq-node">
                <span className="aq-node-icon">🥬</span>
                <div className="aq-node-text">
                  <h4>3. Penyerapan Tanaman</h4>
                  <p>Akar tanaman menyerap nutrisi untuk tumbuh lebat sekaligus menyaring air menjadi bersih kembali.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Placeholder */}
        <div style={{
          marginTop: '60px',
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '50px 20px',
          textAlign: 'center',
          backgroundColor: '#fafcf9'
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📸</span>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Dokumentasi Kegiatan Program</h4>
          <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto' }}>
            Foto-foto pelaksanaan program kerja kelompok KKM di lapangan akan diperbarui di sini setelah instalasi aquaponik resmi dibangun dan beroperasi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aquaponik;
