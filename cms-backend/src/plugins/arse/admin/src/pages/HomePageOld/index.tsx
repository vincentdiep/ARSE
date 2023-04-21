/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState, useRef} from 'react';
import pluginId from '../../pluginId';
import './arse.css';

import Canvas from './Canvas';

import { Shape } from './ShapeTypes';

const App: React.FC = () => {
  const [savedShapes, setSavedShapes] = useState<Shape[]>([]);
  const [tempShape, setTempShape] = useState<Shape>();
  const [name, setName] = useState<string>('');
  const [shapeType, setShapeType] = useState<string>('rectangle');
  const [color, setColor] = useState<string>('#000000');

  const handleAddShape = (shape: Shape) => {
    setSavedShapes([...savedShapes, shape]);
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="shapeType">Shape Type: </label>
        <input
          id="shapeType"
          type="text"
          value={shapeType}
          onChange={(e) => setShapeType(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="color">Color: </label>
        <input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <Canvas savedShapes={savedShapes}
              addShape={handleAddShape} 
              tempShape={tempShape}
              setTempShape={setTempShape}
              name={name}
              color={color}
              shapeType={shapeType} />
    </div>
  );
};

export default App;
