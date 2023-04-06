import React from 'react'
import { Link } from 'react-router-dom'
import castleLogoWhite from '../assets/castle_logo_white.png'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className='custom-wrapper container d-flex flex-column align-items-center justify-content-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.8, 0.2, 1.01],
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 50,
            restDelta: 0.001
          }
        }}
        id='home-menu'
        className='text-center col-11 col-sm-8 d-flex flex-column align-items-center px-3'
      >
        <div className='mt-3 position-relative'>
          <svg id='arc' viewBox='0 0 100 100' className='position-absolute bottom-0'>
            <motion.path
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
              d='M3 93 A46 47, 0, 0 1, 98 93'
              stroke='white'
              strokeWidth='1'
              fill='none'
            />
          </svg>
          <img id='home-image' className='position-relative' src={castleLogoWhite} alt='castle logo' style={{ width: 300 }} />
        </div>
        <h1 id='home-title' className='mb-3'>Disney Character Game</h1>
        <Link className='col-6' to='/game-1'>
          <motion.button
            id='home-button'
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='btn text-white col-12'
          >Play!
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default Home
