import { useEffect, useState } from 'react'
import './App.css'
import Share from './Share'
import {compile} from 'html-to-text';

function App() {
  const [images, setImages] = useState([]);
  const [doneText, setDoneText] = useState('No');

  useEffect(() => {
    fetch("https://dummyimage.com/1280x720/fff/aaa")
    .then(function(response) {
      return response.blob()
    })
    .then(function(blob) {

      const file = new File([blob], "picture.jpg", {type: 'image/jpeg'});
      
      setImages([file]);
      setDoneText('yes');
    })
  }, [])
  
  return (
    <>
    <p>{doneText}</p>
    {
      images.length > 0 ? (
        <div className="App">
          <Share
          label="Share"
          title="My Web Share Adventures"
          text={convert('<a href="www.google.com">Hello World</a>')}
        />
        </div>
      ) : (<></>)
    }
    </>
  )
  
  
  
}

export default App
