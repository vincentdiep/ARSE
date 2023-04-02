
import React from 'react';
import pluginId from '../../pluginId';

const gridSize = 10;
const regions = [
  { id:1, name: 'Refrigerator', color:'#FF0000' ,pos: {x:0,y:0,w:100,h:100} },
  { id:2, name: 'Laundry',color:'#00FF00', pos: {x:0,y:0,w:100,h:100} },
  { id:3, name: 'Ranges',color:'#0000FF', pos: {x:0,y:0,w:100,h:100} },
];
let currentPos = { x: 0, y: 0 };
let rect = { x: 0, y: 0, w: 0, h: 0 };

function snapToGrid(value) {
  return Math.round(value / gridSize) * gridSize;
}

function drawRect(ctx, r) {
  ctx.beginPath();
  ctx.rect(r.x, r.y, r.w, r.h);
  ctx.stroke();
}

var background = new Image();
background.src = "http://www.samskirrow.com/background.png";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
}


export const RegionList = () => {
  const listItems = regions.map(region =>
    <li
      key={region.id}
      style={{
        color: region.color 
      }}
    >
      {region.name}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export const FloorplanCanvas = () => {
  return (
    <>
      <canvas id='myCanvas'></canvas>
    </>
  )
}

