import React, { useCallback, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { replaceSelfClosingTags } from './utils';

import formatXML from 'xml-formatter';

import './App.css';

import * as Images from './images/index';

const imageKeys = Object.keys(Images);
const images = Object.values(Images);

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
  const [showSource, toggleShowSource] = useState(false);
  const [displayName, toggleDisplayName] = useState(false);
  const [displayMenu, toggleDisplayMenu] = useState(false);

  let Component: React.FunctionComponent;

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowDown':
      case 'KeyN':
        setImageIndex(imageIndex =>
          imageIndex + 1 === images.length ? 0 : imageIndex + 1
        );
        break;
      case 'ArrowUp':
      case 'KeyP':
        setImageIndex(imageIndex =>
          imageIndex - 1 === -1 ? images.length - 1 : imageIndex - 1
        );
        break;
      case 'KeyS':
        toggleShowSource(showSource => !showSource);
        break;
      case 'KeyD':
        toggleDisplayName(on => !on);
        break;
      case 'KeyM':
        toggleDisplayMenu(on => !on);
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

  Component = images[imageIndex];

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
      <div
        style={{ display: displayName ? 'inline' : 'none' }}
        className="image-name"
      >
        {imageKeys[imageIndex]}
      </div>
      {displayMenu && (
        <div id="menu">
          <ul>
            {imageKeys.map((name, i) => {
              let Component = images[i];
              return (
                <li
                  key={name}
                  className={
                    imageIndex === imageKeys.indexOf(name) ? 'active' : ''
                  }
                  onClick={() => setImageIndex(imageKeys.indexOf(name))}
                >
                  <Component />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <Component />
    </div>
  );
};

export default App;
