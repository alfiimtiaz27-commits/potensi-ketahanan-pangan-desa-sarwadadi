import React, { useRef, useState } from 'react';

const DraggableItem = ({ id, disabled, isDropped, dropZoneRef, onDropSuccess, children, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const itemRef = useRef(null);

  const handlePointerDown = (e) => {
    if (disabled || isDropped) return;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (err) {
      // Fallback if setPointerCapture is unsupported
    }
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setPosition({ x: dx, y: dy });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (err) {}
    setIsDragging(false);

    if (dropZoneRef && dropZoneRef.current) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      const dropX = e.clientX;
      const dropY = e.clientY;
      if (
        dropX >= rect.left &&
        dropX <= rect.right &&
        dropY >= rect.top &&
        dropY <= rect.bottom
      ) {
        onDropSuccess(id);
        setPosition({ x: 0, y: 0 });
        return;
      }
    }

    // Reset back to original position
    setPosition({ x: 0, y: 0 });
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={itemRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`drag-item ${isDropped ? 'dragged' : ''} ${className}`}
      style={{
        transform: isDragging ? `translate3d(${position.x}px, ${position.y}px, 0) scale(1.05)` : 'none',
        zIndex: isDragging ? 9999 : 1,
        touchAction: 'none',
        cursor: isDropped ? 'default' : (isDragging ? 'grabbing' : 'grab'),
        boxShadow: isDragging ? '0 12px 24px rgba(0,0,0,0.18)' : undefined,
        transition: isDragging ? 'none' : 'transform 0.2s ease, box-shadow 0.2s ease',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
