import React, { useEffect, useState, useRef} from 'react';
import './style.css';
import pluginId from '../../pluginId';
import { FloorplanImgData, Floorplan } from './FloorplanTypes';

import { sample_fp_data, sample_fp_list } from './sample_fp';
import { FloorplanList } from './FloorplanList';
import { FloorplanEditor } from './FloorplanEditor';

import { Box, Grid, GridItem, Button, Typography } from '@strapi/design-system';

export default function App() {
  var floorplan_fp = useRef(null);
  const [imgFile, setImgFile] = React.useState<FloorplanImgData>({xml:sample_fp_data});
  const [errorMsg, setErrorMsg]  = React.useState<string>("");
  const [editorOpen, setEditorOpen]  = React.useState<boolean>(false);
  const [imgSrc, setImgSrc]  = React.useState<string>("/uploads/fpcolored_drawio_f4ee505610.svg"); // "/uploads/fp_fdcfaaa7ca.svg"
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
        floorplanImgData: imgFile,
        id: 0,
        storeName: "La Habra",
        storeId: 10,
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

    const reader = new FileReader(); // create a new FileReader instance
    reader.onload = function(event) {
      const fileContents = event.target?.result as string; // get the contents of the file
      const src = URL.createObjectURL(file); // create a blob URL for the file
      setImgFile({xml:fileContents});
      setImgSrc(src);
    };

    if (file) {
      reader.readAsText(file);
    }
  };
  
  const saveClick = (e) => {
    if (imgFile) {
      saveLocalFloorplan('')
    }
    else {
      setErrorMsg("No file selected");
    }
  };

  const closeFrame = () => {
    setEditorOpen(false);
  }

  const editImg = (e) => {
    setEditorOpen(true);
  }

  return (
    <div>
      <Typography variant="alpha" >ARSE - Floorplan Editor</Typography>
      { errorMsg && (<Box padding={4} color="danger200"><Typography variant="delta">{ errorMsg }</Typography></Box>) }
      <Grid>
        <GridItem col={3} >
          <FloorplanList floorplanList={sample_fp_list}></FloorplanList>
        </GridItem>
        <GridItem col={6}>
          <img ref={imageRef} id="image" src={imgSrc} onClick={editImg}  />
          <input
            ref={floorplan_fp}
            type="file"
            accept=".xml,.drawio,.svg"
            onChange={onChangeInput}
          />
        </GridItem>
        { ( editorOpen && (imgFile != null && imgFile != undefined) ) &&
            (<FloorplanEditor imgFile={imgFile}
                              setImgFile={setImgFile}
                              imgSrc={imgSrc}
                              setImgSrc={setImgSrc}
                              clearDraft={clearDraft}
                              closeFrame={closeFrame} />)}
      </Grid>
      <Button onClick={saveClick}>Save</Button>
      <Button onClick={clearDraft}>Clear Local Store</Button>
    </div>
  );
}
