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
        setImageIndex(imageIndex =>
          imageKeys.includes(imageIndex + 1) ? imageIndex + 1 : imageIndex
        );
        break;
      case 'ArrowLeft':
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

  const renderSVGSource = useCallback(() => {
    const Component = Images[imageIndex];
    console.log(ReactDOMServer.renderToString(<Component />));
  }, [imageIndex]);

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
    <Component />
  );
};

export default App;
