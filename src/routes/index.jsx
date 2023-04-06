import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Game from '../pages/Game'
import About from '../pages/About'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game-1' element={<Game />} />
      <Route path='/about' element={<About />} />
    </Routes>
  )
}

export default RoutesIndex
