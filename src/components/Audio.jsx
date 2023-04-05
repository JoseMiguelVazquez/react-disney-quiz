import React, { useEffect } from 'react'
import song from '../assets/audio/song.mp3'

const Audio = () => {
  useEffect(() => {
    const songPlay = document.getElementById('song')
    songPlay.play().catch((error) => {
      console.log(error)
      document.addEventListener('click', () => {
        songPlay.play()
      }, { once: true })
    })
  }, [])

  return (
    <div>
      <audio id='song' src={song} controls autoPlay loop />
    </div>
  )
}

export default Audio
