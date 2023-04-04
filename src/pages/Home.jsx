import React from 'react'
import { Link } from 'react-router-dom'
import castleLogoWhite from '../assets/castle_logo_white.png'

const Home = () => {
  return (
    <div className='puff-in-center custom-wrapper container d-flex flex-column align-items-center justify-content-center'>
      <div id='home-menu' className='text-center col-11 col-sm-8 d-flex flex-column align-items-center px-3 text-white'>
        <div className='mt-3'>
          <img src={castleLogoWhite} alt='ears logo' style={{ width: 200 }} />
        </div>
        <h1 className='mb-3'>Disney Character Game</h1>
        <Link className='btn btn-light btn-custom mb-4 col-6' to='/game-1'>Play!</Link>
      </div>
    </div>
  )
}

export default Home
