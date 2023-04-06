import React, { useEffect, useState } from 'react'
import song from '../assets/audio/song.mp3'

const Audio = () => {
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const songPlay = document.getElementById('song')
    document.addEventListener('click', () => {
      songPlay.play()
    }, { once: true })
  }, [])

  function muteAudio () {
    setIsMuted(!isMuted)
  }

  return (
    <div>
      <audio id='song' src={song} loop muted={isMuted} />
      <button className='position-fixed end-0 mt-2 me-2' onClick={muteAudio}>
        {isMuted
          ? <i className='bi bi-volume-mute-fill' />
          : <i className='bi bi-volume-up-fill' />}
      </button>
    </div>
  )
}

export default Audio
