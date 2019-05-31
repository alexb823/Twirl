import React, {useState, useEffect} from 'react';
import ReactWordcloud from "react-wordcloud";
import data from './dummyData';

const WordcloudFullScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeigh] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeigh(window.innerHeight);
  }

  useEffect(()=> {
    window.addEventListener('resize', handleResize);
    return ()=> {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
      <ReactWordcloud words={data} size={[width, height]} options={{
    colors: [
      '#000000',
    ],
    fontFamily: 'impact',
    fontSizes: [10, 90],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 0,
    scale: 'linear',
    spiral: 'rectangular',
  }}/>
  );
};


export default WordcloudFullScreen;