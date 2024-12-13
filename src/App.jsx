import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmojiRain from './components/EmojiRain'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='container'>

   <EmojiRain/>
   </div>
  )
}

export default App
