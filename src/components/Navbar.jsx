import React from 'react'
import { NavLink } from 'react-router-dom'
import earsLogo from '../assets/ears_logo.png'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-sm bg-white'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand d-flex align-items-center' to='/'>
          <img
            className='me-1'
            src={earsLogo}
            alt='ears logo'
            style={{ width: 30 }}
          />
          Trivia
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link active' aria-current='page' to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/about'>About</NavLink>
            </li>
            <li className='nav-item dropdown'>
              <NavLink
                className='nav-link dropdown-toggle'
                to='#' role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Games
              </NavLink>
              <ul className='dropdown-menu'>
                <li><NavLink className='dropdown-item' to='/game-1'>Game 1</NavLink></li>
                <li><NavLink className='dropdown-item' to='/game-2'>Game 2</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
