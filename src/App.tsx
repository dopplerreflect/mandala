import { useCallback, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { replaceSelfClosingTags } from './utils';

import format from 'xml-formatter';

import './App.css';
//@ts-ignore
import Images from './images/index';

const imageKeys = [...Images.keys()];

const App = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [showSource, setShowSource] = useState(false);

  let Component;

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowRight':
      case 'KeyN':
        setImageIndex(imageIndex =>
          imageKeys.includes(imageIndex + 1) ? imageIndex + 1 : imageIndex
        );
        break;
      case 'ArrowLeft':
      case 'KeyP':
        setImageIndex(imageIndex =>
          imageKeys.includes(imageIndex - 1) ? imageIndex - 1 : imageIndex
        );
        break;
      case 'KeyS':
        setShowSource(showSource => !showSource);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown);
    return () => document.removeEventListener('keyup', handleKeyDown);
  }, []);

  Component = Images[imageIndex];

  return showSource ? (
    <code>
      {format(
        replaceSelfClosingTags(ReactDOMServer.renderToString(<Component />)),
        {
          indentation: '  ',
        }
      )}
    </code>
  ) : (
    <image>
      <Component />
    </image>
  );
};

export default App;
