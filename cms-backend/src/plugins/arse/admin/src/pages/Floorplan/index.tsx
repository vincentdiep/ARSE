import React, { useEffect, useState, useRef} from 'react';
import './style.css';
import pluginId from '../../pluginId';
import { StoreMap } from './StoreMap';

export default function App() {
  var floorplan_fp = useRef(null);
  const [imgFile, setImgFile] = React.useState(null);

  const onChangeInput = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImgFile(file);
  };

  const uploadClick = (e) => {};

  return (
    <div>
      <h1>ARSE - Floorplan Editor</h1>
      <input
        ref={floorplan_fp}
        type="file"
        accept=".xml,.drawio,.svg"
        onChange={onChangeInput}
      />
      <p>Click floorplan to edit</p>
      <StoreMap imgFile={imgFile} />
      <button onClick={uploadClick}>Save</button>
    </div>
  );
}
