import React, { useState } from 'react';

const ImageFallback = ({ src, fallbackEmoji, caption, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="image-placeholder-box" style={{ 
        height: '240px', 
        background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.08), rgba(141, 110, 99, 0.08))',
        border: '2px dashed var(--border-color)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        width: '100%',
        transition: 'var(--transition)'
      }}>
        <span style={{ fontSize: '3rem' }}>{fallbackEmoji}</span>
        <h4 style={{ marginTop: '12px', fontSize: '1rem', color: 'var(--primary-dark)' }}>{caption}</h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>
          Letakkan foto dengan nama file sesuai di folder public/images/
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <img 
        src={src} 
        alt={alt || caption} 
        onError={() => setHasError(true)}
        style={{ 
          width: '100%', 
          height: '240px', 
          objectFit: 'cover', 
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
          display: 'block'
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        padding: '12px',
        borderBottomLeftRadius: 'var(--radius-md)',
        borderBottomRightRadius: 'var(--radius-md)',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: 600
      }}>
        {caption}
      </div>
    </div>
  );
};

export default ImageFallback;
