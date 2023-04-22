import * as React from 'react';
import { useEffect, useRef } from 'react';
import './storemapStyle.css';

interface mapImg {
  xml?: string;
  data?: string;
}
interface StoredMap {
  lastModified: Date;
  mapImg: mapImg;
}

interface ServerMessage {
  event: string;
  format?: string;
  message?: string;
  data?: string;
  xml?: string;
}
export const StoreMap = (imgFile: File) => {
  var editor = 'https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json';
  var initial: string | null = null;
  var name: string | null = null;
  const imageRef = useRef(null);


  const setItem = (key: string, mi: mapImg) => {
    const sm: StoredMap = {
      lastModified: new Date(),
      mapImg: mi,
    };
    console.log('saving item:');
    console.log(key);
    console.log(sm);
    localStorage.setItem(key, JSON.stringify(sm));
  };

  let getSVGdata = async (imageSrc) => {
    let res = await fetch(imageSrc);
    let data = await res.text();
    const parser = new DOMParser();
    const svg: SVGSVGElement | null = parser
      .parseFromString(data, 'image/svg+xml')
      .querySelector('svg');

    if (svg instanceof Node) {
      var ads = document.adoptNode(svg);
      console.log(ads);
      return ads;
    }
  };

  let serializeSVG = (svg) => {
    var s = new XMLSerializer().serializeToString(svg);
    return s;
  };

  let updateImgSrc = (src) => {
    imageRef.current.setAttribute('src', src);

  }

  function getItem(key: string): StoredMap | null {
    var s = localStorage.getItem(key)
    if (s != null) {
      var draft: StoredMap | null = JSON.parse(s);
      if (draft != null) {
        return draft;
      }
    }
    return null;
  }

  const edit = () => {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');

    var close = function () {
      window.removeEventListener('message', receive);
      document.body.removeChild(iframe);
    };

    var draft = getItem('.draft-' + name);

    var receive = async function (evt) {
      var src = imageRef.current.getAttribute('src');
      if (iframe.contentWindow != null && imageRef.current != null) {
        if (evt.data.length > 0) {
          var msg: ServerMessage = JSON.parse(evt.data);
          console.log(msg);
          if (msg.event == 'init') {
            if (draft != null) {
              iframe.contentWindow.postMessage(
                JSON.stringify({
                  action: 'load',
                  autosave: 1,
                  xml: draft.mapImg.xml,
                }),
                '*'
              );
              iframe.contentWindow.postMessage(
                JSON.stringify({ action: 'status', modified: true }),
                '*'
              );
            } else {
              const svg = await getSVGdata(src);
              const svg_node = svg ? serializeSVG(svg) : null;
              iframe.contentWindow.postMessage(
                JSON.stringify({
                  action: 'load',
                  autosave: 1,
                  xml: svg_node,
                }),
                '*'
              );
            }
          } else if (msg.event == 'export') {
            imageRef.current.setAttribute('src', msg.data);
            setItem('' + name, { data: msg.data });
            localStorage.removeItem('.draft-' + name);
            draft = null;
            close();
          } else if (msg.event == 'autosave') {
            setItem('.draft-' + name, { xml: msg.xml });
          } else if (msg.event == 'save') {
            iframe.contentWindow.postMessage(
              JSON.stringify({
                action: 'export',
                format: 'xmlpng',
                xml: msg.xml,
                spin: 'Updating page',
              }),
              '*'
            );
            setItem('.draft-' + name, { xml: msg.xml });
          } else if (msg.event == 'exit') {
            localStorage.removeItem('.draft-' + name);
            draft = null;
            close();
          }
        }
      }
    };

    window.addEventListener('message', receive);
    iframe.setAttribute('src', editor);
    document.body.appendChild(iframe);
  };

  function start() {
    name =
      window.location.hash.length > 1
        ? window.location.hash.substring(1)
        : 'default';

    var current: StoredMap | null = getItem(name);

    console.log(current);
    if (current != null) {
      if (imageRef.current != null) {
        imageRef.current.setAttribute('src', current.mapImg.data);
      }
    } else {
      if (imageRef.current != null) {
        imageRef.current.setAttribute('src', initial);
      }
    }
  }
  function load() {
    if (imageRef.current != null) {
      initial = imageRef.current.getAttribute('src');
      start();
    }
  }

  function clearLocalStores() {
    localStorage.clear();
    if (imageRef.current != null) {
      imageRef.current.setAttribute('src', initial);
    }
  }
  window.addEventListener('hashchange', start);

  useEffect(() => {
    load();
  }, [imageRef]);

  return (
    <div>
      <img ref={imageRef} id="image" src="fp.svg" onClick={edit} />
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
      <button onClick={clearLocalStores} className="btn btn-alert">
        Clear Local Stores!
      </button>
    </div>
  );
}