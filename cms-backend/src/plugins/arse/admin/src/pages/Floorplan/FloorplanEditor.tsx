import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './storemapStyle.css';

export interface FloorplanImgData {
  xml?: string;
  data?: string;
}

interface ServerMessage {
  event: string;
  format?: string;
  message?: string;
  data?: string;
  xml?: string;
}

interface Props {
  imgFile: FloorplanImgData,
  setImgFile,
  imgSrc: string,
  setImgSrc,
  clearDraft
}

export const FloorplanEditor = ({imgFile, setImgFile, imgSrc, setImgSrc, clearDraft}) => {

  var editor = 'https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json';
  var initial: string | null = null;
  var name: string | null = null;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  let getSVGdata = (): Promise<SVGSVGElement | undefined> => {
    return new Promise((resolve, reject) => {
      if (imgSrc) {
        fetch(imgSrc)
          .then((res) => res.text())
          .then((data) => {
            const parser = new DOMParser();
            const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
            if (svg instanceof Node) {
              var adoptedImgNode = document.adoptNode(svg);
              resolve(adoptedImgNode);
            }
            else {
              reject(new Error('Could not parse SVG'));
            }
          })
         .catch((error) => {
            reject(error);
          });
        } else {
          reject(new Error('No image source provided'));
        }
      })
  };

  let serializeSVG = (svg) => {
    var s = new XMLSerializer().serializeToString(svg);
    return s;
  };

  useEffect(() => {
    var receive = function (evt) {
      const iframeWindow = iframeRef.current?.contentWindow as Window;
      if (iframeWindow) {
        if (evt.data.length > 0) {
          var msg: ServerMessage = JSON.parse(evt.data);
          console.log(msg);
          if (msg.event == 'init') {
            if (imgFile != null) {
              iframeWindow.postMessage(
                JSON.stringify({
                  action: 'load',
                  autosave: 1,
                  xml: imgFile.xml,
                }),
                '*'
              );
              iframeWindow.postMessage(
                JSON.stringify({ action: 'status', modified: true }),
                '*'
              );
            } else {
              getSVGdata()
              .then((svg) => {
                const svg_node = svg ? serializeSVG(svg) : null;
                iframeWindow.postMessage(
                  JSON.stringify({
                    action: 'load',
                    autosave: 1,
                    xml: svg_node,
                  }),
                  '*'
                );
              })
              .catch((error) => {
                console.error(error);
              });
            }
          } else if (msg.event == 'export') {
            setImgSrc(msg.data)
            setImgFile({ data: msg.data });
            clearDraft();
            close();
          } else if (msg.event == 'autosave') {
            setImgFile({ xml: msg.xml });
          } else if (msg.event == 'save') {
            iframeWindow.postMessage(
              JSON.stringify({
                action: 'export',
                format: 'xmlpng',
                xml: msg.xml,
                spin: 'Updating page',
              }),
              '*'
            );
            setImgFile({ xml: msg.xml });
          } else if (msg.event == 'exit') {
            clearDraft();
            close();
          }
        }
      }
    };

    function start() {
      name =
        window.location.hash.length > 1
          ? window.location.hash.substring(1)
          : 'default';
    }

    start();
    window.addEventListener('message', receive);

    return () => {
      window.removeEventListener('message', receive);
    }
  }, []);

  return (
    <div>
      <iframe ref={iframeRef} src={editor} />
      <div
        style={{
          position: 'fixed',
          fontFamily: 'Arial',
          fontSize: '10pt',
          color: '#cccccc',
          bottom: '0px',
          right: '0px',
          marginRight: '10px',
          marginBottom: '10px',
        }}
      >
        Powered by{' '}
        <a href="https://www.diagrams.net" target="_blank">
          diagrams.net
        </a>
      </div>
    </div>
  );
}