import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Game from '../pages/Game'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game-1' element={<Game />} />
    </Routes>
  )
}

export default RoutesIndex
