/*
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import pluginId from '../../pluginId';
import { Canvas } from './canvas';
import './arse.css';
const HomePage = () => {
  useEffect(() => {
    Canvas();
  },[])
  return (
    <>
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <canvas id="myCanvas" className='canvas-grid' width='500px' height='500px'></canvas>
    </div>
    </>
  );
};

export default HomePage;
