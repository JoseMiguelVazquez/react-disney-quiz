import React from 'react'

const About = () => {
  return (
    <div id='about-div' className='container mt-5'>
      <h1 className='text-white'>About</h1>
      <p className='text-white'>This app was made with React, using the <a target='_blank' href='https://disneyapi.dev/' rel='noreferrer'>Disney API</a>.
        Transitions/Animations were made with the <a target='_blank' href='https://www.framer.com/motion/' rel='noreferrer'>framer motion library</a>, routing was made with <a target='_blank' href='https://reactrouter.com/en/main' rel='noreferrer'>react router</a> and the background gradient with <a target='_blank' href='https://angrytools.com/gradient/' rel='noreferrer'>angry tools</a>.
      </p>
      <p className='text-white'>Since Disney API went down, API was changed to <a href='https://akabab.github.io/superhero-api/api'>Superhero API</a></p>
      <p className='text-white'>Music by
        <a target='_blank' href='https://pixabay.com/users/fassounds-3433550/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=140858' rel='noreferrer'>FASSounds</a> from <a target='_blank' href='https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=140858' rel='noreferrer'>Pixabay</a>
      </p>
      <p className='text-white mt-5'>Developed by José Miguel Vázquez E.</p>
    </div>
  )
}

export default About
