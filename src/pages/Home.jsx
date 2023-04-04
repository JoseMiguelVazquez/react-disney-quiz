import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='custom-wrapper container d-flex flex-column align-items-center justify-content-center'>
      <div className='card'>
        <h1>Disney Character Game</h1>
        <Link className='btn btn-light' to='/game-1'>Play!</Link>
      </div>
    </div>
  )
}

export default Home
