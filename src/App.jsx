import { useEffect, useState } from 'react'
import './App.css'
import Share from './Share'
import {convert} from 'html-to-text';

function App() {
  const [doneText, setDoneText] = useState('No');

  return (
    <>
    <p>{doneText}</p>
        <div className="App">
          <Share
          label="Share"
          title="My Web Share Adventures"
          text={convert('<a href="www.google.com">Hello World</a>')}
        />
        </div>
    </>
  )
  
  
  
}

export default App
