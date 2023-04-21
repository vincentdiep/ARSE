
import React, { useRef, useState } from 'react';
import { Shape, ShapePosition } from './ShapeTypes';

interface CanvasProps {
  savedShapes: Shape[];
  addShape: (shape: Shape) => void;
  tempShape?: Shape;
  setTempShape: (shape: Shape) => void;
  name: string;
  shapeType: string;
  color: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const GRID_SIZE = 10

const Canvas: React.FC<CanvasProps> = ({ savedShapes, addShape, tempShape, setTempShape, name, shapeType, color}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPos, setStartPos] = useState<MousePosition | null>(null);
  const [endPos, setEndPos] = useState<MousePosition | null>(null);

  function snapToGrid(value) {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  }

  function fixOffsetX(x, canvas: HTMLCanvasElement) {
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      x = x - canvasRect.left
    }
    return x
  }

  function fixOffsetY(y, canvas: HTMLCanvasElement) {
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      y = y - canvasRect.top
    }
    return y
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setStartPos({ x: event.clientX, y: event.clientY });
    setEndPos(null);
  };

  const make_shape = (alive=false) => {
    if (startPos && endPos) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          var rectWidth = snapToGrid(fixOffsetX(endPos!.x, canvas) - startPos!.x);
          var rectHeight = snapToGrid(fixOffsetY(endPos!.y, canvas) - startPos!.y);
          const shapePosition: ShapePosition = {
            x: snapToGrid(startPos!.x),
            y: snapToGrid(startPos!.y),
            w: rectWidth,
            h: rectHeight,
          };
          const shape: Shape = {
            alive: alive,
            name: name,
            shape: shapeType,
            color: color,
            pos: shapePosition,
          };
          return shape
        }
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (startPos) {
      setEndPos({ x: event.clientX, y: event.clientY });
    }
    const shape: Shape | undefined = make_shape(false);
    if (shape) {
      setTempShape(shape);
    }
  };
  
  const handleMouseUp = () => {
    const shape: Shape | undefined = make_shape(true)
    if (shape) {
      addShape(shape);
      setStartPos(null);
      setEndPos(null);
    }
  }

  // Draw all saved shapes on the canvas
  const drawShapes = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        savedShapes.forEach((shape) => {
          if (shape.alive && shape.shape === 'rectangle') {
            ctx.strokeStyle = shape.color;
            ctx.strokeRect(shape.pos.x, shape.pos.y, shape.pos.w, shape.pos.h);
          }
        });

        if (tempShape && tempShape.shape === 'rectangle') {
            ctx.strokeStyle = tempShape.color;
            ctx.strokeRect(tempShape.pos.x, tempShape.pos.y, tempShape.pos.w, tempShape.pos.h);
        }
      }
    }
  };

  // Redraw all shapes when savedShapes changes
  React.useEffect(() => {
    drawShapes();
  }, [savedShapes]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="canvas-grid"
      width="500px"
      height="500px"
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;
