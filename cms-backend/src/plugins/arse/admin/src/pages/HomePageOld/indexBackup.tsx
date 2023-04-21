/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState, useRef} from 'react';
import pluginId from '../../pluginId';
import './arse.css';

interface ShapePosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Shape {
  alive: boolean;
  name: string;
  shape: string;
  pos: ShapePosition;
}

const HomePage = () => {

  const newShape: Shape = {
    alive: true,
    name: 'temp shape',
    shape: 'rectangle',
    pos: {
      x: 100,
      y: 100,
      w: 50,
      h: 50
    }
  }
  const [saved_shapes, setShapes] = useState< { shapes: Shape[] }>({ shapes: [] });


  const addShape = (shape: Shape) => {
  console.log('adding shape:');
  console.log(shape);
  setShapes(prevState => ({
    shapes: [...prevState.shapes, shape]
  }));
}
  

  return (
    <>
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <ARSEcanvas saved_shapes={saved_shapes} onAddItem={addShape} /> 
    </div>
    <ul>
      {/* {saved_shapes.map((shape, index)=> (
        <li key={index}>{shape.name}</li>
      ))} */}
    </ul>
    </>
  );
};

function ARSEcanvas({ saved_shapes, onAddItem }) {

  // Create a variable to store the current mouse position
  let currentPos = { x: 0, y: 0 };
  // Create a variable to store the grid size
  const gridSize = 10;
  // Create a variable to store the rectangle position and size
  let rect = { x: 0, y: 0, w: 0, h: 0 };


  let temp_shape: Shape = {
        alive:false,
        name:'temp_shape',
        shape:'rectangle', // one date allow other shapes to be used
        pos:{
            x:0,
            y:0,
            w:0,
            h:0
            }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);


  let canvas: HTMLCanvasElement | null = null;
  let ctx: any = null;

  useEffect(()=> {

    canvas = (canvasRef.current);
    ctx = canvas?.getContext('2d');

    if(canvas) {
      canvas.addEventListener("mousedown", (e) => {
        currentPos = {
            x: fixOffsetX(e.clientX),
            y: fixOffsetY(e.clientY)
        }
        rect.x = snapToGrid(currentPos.x);
        rect.y = snapToGrid(currentPos.y);
        canvas!.addEventListener("mousemove", mousemove);
      });

      // Event listener for mouse up
      canvas!.addEventListener("mouseup", () => {
        canvas!.removeEventListener("mousemove", mousemove);
        rect.w = snapToGrid(rect.w);
        rect.h = snapToGrid(rect.h);

        addItem(temp_shape)
        temp_shape.alive = false;

        clearScreen();
        drawSavedShapes();
      });
    }
  }, [canvas])


  

    function addItem(shape) {
        onAddItem(shape);
    }

    // Function to snap a value to the grid size
    function snapToGrid(value) {
    return Math.round(value / gridSize) * gridSize;
    }

    // Function to draw the rectangle
    function drawRect(r) {
      if (ctx) {
        ctx.beginPath();
        ctx.rect(r.x, r.y, r.w, r.h);
        ctx.stroke();
      }
    }

    function clearScreen() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    function drawTempShape() {
        if (temp_shape) {
            if ("pos" in temp_shape) {
              drawRect(temp_shape["pos"]);
            }
        }
    }
    function drawSavedShapes() {
      console.log('Save shapes:')
      console.log(saved_shapes)
      if (saved_shapes.shapes.length > 0) {
        saved_shapes.shapes.forEach( (s:Shape) => {
            if (s['shape'] == 'rectangle') {
              drawRect(s.pos);
            }
        })
      }
    }

    function fixOffsetX(x) {
      if (canvas) {
        const canvasRect = canvas.getBoundingClientRect();
        x = x - canvasRect.left
      }
      return x
    }
    function fixOffsetY(y) {
      if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      y = y - canvasRect.top
      }
      return y
    }



    // Function to track mouse movement
    function mousemove(e) {
      rect.w = fixOffsetX(e.clientX) - currentPos.x;
      rect.h = fixOffsetY(e.clientY) - currentPos.y;
      rect.w = snapToGrid(rect.w);
      rect.h = snapToGrid(rect.h);
      
      temp_shape = {
        alive:true,
        name:'',
        shape:'rectangle',
        pos:{
            x:snapToGrid(currentPos.x),
            y:snapToGrid(currentPos.y),
            w:rect.w,
            h:rect.h
          }
      };
      clearScreen();
      drawSavedShapes();
      drawTempShape();
    }

  return (
      <canvas ref={canvasRef} id="myCanvas" className='canvas-grid' width='500px' height='500px'></canvas>
  );
}
export default HomePage;
