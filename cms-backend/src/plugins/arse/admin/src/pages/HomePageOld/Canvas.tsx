
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

  function fixOffsetX(x: number, canvas_left_edge: number) {
    return x - canvas_left_edge
  }

  function fixOffsetY(y: number, canvas_top_edge: number) {
    return y - canvas_top_edge
  }
  function fixAndSnapX(x:number) {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      return snapToGrid(fixOffsetX(x, canvasRect.left))
    }
    return x
  }
  function fixAndSnapY(y:number) {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      return snapToGrid(fixOffsetY(y, canvasRect.top))
    }
    return y
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setStartPos({
       x: fixAndSnapX(event.clientX), 
       y: fixAndSnapY(event.clientY) 
      });
    setEndPos(null);
  };

  const make_shape = () => {
    if (startPos && endPos) {
      const canvas = canvasRef.current;
      var rectWidth = endPos!.x - startPos!.x;
      var rectHeight = endPos!.y - startPos!.y;
      const shapePosition: ShapePosition = {
        x: startPos!.x,
        y: startPos!.y,
        w: rectWidth,
        h: rectHeight,
      };
      const shape: Shape = {
        name: name,
        shape: shapeType,
        color: color,
        pos: shapePosition,
      };
      return shape
      }
    }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (startPos) {
      setEndPos({
        x: fixAndSnapX(event.clientX), 
        y: fixAndSnapY(event.clientY)
      });
    }
    const shape: Shape | undefined = make_shape();
    if (shape) {
      setTempShape(shape);
    }
  };
  
  const handleMouseUp = () => {
    const shape: Shape | undefined = make_shape()
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
          if (shape.shape === 'rectangle') {
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
  }, [savedShapes, tempShape]);

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
