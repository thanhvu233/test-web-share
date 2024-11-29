import { useEffect, useState } from 'react'
import './App.css'
import Share from './Share'

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/200")
    .then(function(response) {
      return response.blob()
    })
    .then(function(blob) {

      const file = new File([blob], "picture.jpg", {type: 'image/jpeg'});
      
      setImages([file]);
    })
  }, [])
  
  return images.length > 0 ? (
    <div className="App">
      <Share
      label="Share"
      title="My Web Share Adventures"
      text="Hello World! I shared this content via Web Share"
      files={images}
    />
    </div>
  ) : (<></>)
}

export default App
