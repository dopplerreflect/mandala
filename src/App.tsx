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
  const [showSource, toggleShowSource] = useState(false);
  const [displayName, toggleDisplayName] = useState(false);
  const [displayMenu, toggleDisplayMenu] = useState(false);

  let Component: React.FunctionComponent;

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowRight':
      case 'KeyN':
        setImageIndex(imageIndex =>
          imageIndex + 1 === imageKeys.length ? 0 : imageIndex + 1
        );
        break;
      case 'ArrowLeft':
      case 'KeyP':
        setImageIndex(imageIndex =>
          imageIndex - 1 === -1 ? imageKeys.length - 1 : imageIndex - 1
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
      <div
        style={{ display: displayName ? 'inline' : 'none' }}
        className="image-name"
      >
        {imageKeys[imageIndex]}
      </div>
      {displayMenu && (
        <div id="menu">
          <ul>
            {imageKeys.map(name => {
              //@ts-ignore
              let Component = Images[name];
              return (
                <li
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
