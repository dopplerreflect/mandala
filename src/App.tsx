import React, { useCallback, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { replaceSelfClosingTags } from './utils';

import formatXML from 'xml-formatter';

import './App.css';
//@ts-ignore
import * as Images from './images/index';

const imageKeys = Object.keys(Images);

const imageIndexFromDocumentHash = (): false | number => {
  const imageIndexFromDocumentHash = imageKeys.indexOf(
    document.location.hash.replace(/^#/, '')
  );
  return imageIndexFromDocumentHash === -1 ? false : imageIndexFromDocumentHash;
};

const App = () => {
  const [imageIndex, setImageIndex] = useState(
    imageIndexFromDocumentHash() || 0
  );
  const [showSource, setShowSource] = useState(false);

  let Component: React.FunctionComponent;

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowRight':
      case 'KeyN':
        setImageIndex(imageIndex =>
          [...imageKeys.keys()].includes(imageIndex + 1)
            ? imageIndex + 1
            : imageIndex
        );
        break;
      case 'ArrowLeft':
      case 'KeyP':
        setImageIndex(imageIndex =>
          [...imageKeys.keys()].includes(imageIndex - 1)
            ? imageIndex - 1
            : imageIndex
        );
        break;
      case 'KeyS':
        setShowSource(showSource => !showSource);
        break;
      default:
        break;
    }
  };

  const handleHashChange = () => {
    setImageIndex(imageKeys.indexOf(document.location.hash.replace(/^#/, '')));
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      document.removeEventListener('keyup', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    document.location.hash = imageKeys[imageIndex];
  }, [imageIndex]);

  //@ts-ignore
  Component = Images[imageKeys[imageIndex]];

  return showSource ? (
    <code>
      {formatXML(
        replaceSelfClosingTags(ReactDOMServer.renderToString(<Component />)),
        {
          indentation: '  ',
        }
      )}
    </code>
  ) : (
    <div className="svg">
      <Component />
      {/* <code>{imageKeys[imageIndex]}</code> */}
    </div>
  );
};

export default App;
