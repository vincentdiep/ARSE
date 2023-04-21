/*
 *
 * HomePage
 *
 */

import React, { useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);

  const handleMouseDown = (event) => {
    setStartPos({ x: event.clientX, y: event.clientY });
    setEndPos(null);
  };

  const handleMouseMove = (event) => {
    if (startPos) {
      setEndPos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    if (startPos && endPos) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rectWidth = endPos.x - startPos.x;
      const rectHeight = endPos.y - startPos.y;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeRect(startPos.x, startPos.y, rectWidth, rectHeight);
      setStartPos(null);
      setEndPos(null);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;

