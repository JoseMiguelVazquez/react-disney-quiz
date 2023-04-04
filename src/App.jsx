import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import RoutesIndex from './routes/index'
import Audio from './components/Audio'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Audio />
        <RoutesIndex />
      </BrowserRouter>
    </div>
  )
}

export default App
