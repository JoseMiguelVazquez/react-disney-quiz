import './App.css'
import Navbar from './components/Navbar'
import Game from './pages/Game'
import Home from './pages/Home'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <Home />
      <Game />
    </div>
  )
}

export default App
