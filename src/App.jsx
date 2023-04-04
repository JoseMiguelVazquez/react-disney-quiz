import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import RoutesIndex from './routes/index'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <RoutesIndex />
      </BrowserRouter>
    </div>
  )
}

export default App
