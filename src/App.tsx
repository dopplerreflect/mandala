import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
//@ts-ignore
import Images from './images/index';

const App = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const Component = Images[imageIndex];

  const handleKeyDown = (event: KeyboardEvent) => {
    let newIndex = 0;
    switch (event.code) {
      case 'ArrowRight':
        newIndex = imageIndex + 1;
        Images[newIndex] && setImageIndex(newIndex);
        break;
      case 'ArrowLeft':
        newIndex = imageIndex;
        Images[newIndex] && setImageIndex(newIndex);
        break;
      default:
        newIndex = imageIndex;
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // console.log(ReactDOMServer.renderToString(<Component />));

  return <Component />;
};

export default App;
