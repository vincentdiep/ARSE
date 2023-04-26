import React, { useEffect, useState, useRef} from 'react';
import './style.css';
import pluginId from '../../pluginId';
import { FloorplanImgData, FloorplanEditor } from './FloorplanEditor';

interface Floorplan {
  lastModified: Date;
  floorplanImgData: FloorplanImgData;
}

export default function App() {
  var floorplan_fp = useRef(null);
  const [imgFile, setImgFile] = React.useState<FloorplanImgData>();
  const [errorMsg, setErrorMsg]  = React.useState<string>("");
  const [editorOpen, setEditorOpen]  = React.useState<boolean>(false);
  const [imgSrc, setImgSrc]  = React.useState<string>("fp.svg");
  var name: string | null = null;
  var draft: Floorplan | null;

  const imageRef = useRef(null);

  useEffect(()=> {
    getLocalFloorplan('.draft-' + name);
  }, []);

  const clearDraft = () => {
    draft = null;
    localStorage.removeItem('.draft-' + name);
  }
  const saveLocalFloorplan = (key: string | null) => {
    if (imgFile != null) {
      const sm: Floorplan = {
        lastModified: new Date(),
        floorplanImgData: imgFile
      };
      if (key == null) {
        key = ''
      }
      localStorage.setItem(key, JSON.stringify(sm));
    }
    else {
      setErrorMsg('Failed to save file, no image loaded');
    }
  };

  function getLocalFloorplan(key: string | null): Floorplan | null {
    if (key == null) {
      key = ''
    }
    var s = localStorage.getItem(key)
    if (s != null) {
      var draft: Floorplan | null = JSON.parse(s);
      if (draft != null) {
        setImgFile(draft.floorplanImgData)
        return draft
      }
    }
    return null
  }

  const onChangeInput = (e) => {
    const file = e.target.files[0];
    
    setImgFile(file);
    
  };

  const uploadClick = (e) => {
    if (imgFile) {
      saveLocalFloorplan('')
    }
    else {
      setErrorMsg("No file selected");
    }
  };

  const close = () => {
    setEditorOpen(false);
  }

  const editImg = (e) => {
    setEditorOpen(true);
  }

  return (
    <div>
      <h1>ARSE - Floorplan Editor</h1>
      { errorMsg && (<p className="alert">{ errorMsg }</p>) }
      <input
        ref={floorplan_fp}
        type="file"
        accept=".xml,.drawio,.svg"
        onChange={onChangeInput}
      />
      <img ref={imageRef} id="image" src={imgSrc} onClick={editImg}  />
      <p>Click floorplan to edit</p>
      { editorOpen &&
      (<FloorplanEditor imgFile={imgFile}
                        setImgFile={setImgFile}
                        imgSrc={imgSrc}
                        setImgSrc={setImgSrc}
                        clearDraft={clearDraft}
                        close={close} />)}

      <button onClick={uploadClick}>Save</button>
    </div>
  );
}
