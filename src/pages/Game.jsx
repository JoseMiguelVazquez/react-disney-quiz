import React, { useState, useEffect } from 'react'

const Game = () => {
  const [character, setCharacter] = useState([])

  const [options, setOptions] = useState([])

  const createRandomIds = () => {
    const ids = []
    for (let i = 0; i < 4; i++) {
    //   ids.push(Math.floor(Math.random() * 7438))
      ids.push(1 + i)
    }
    return ids
  }

  function checkError (response) {
    if (response.status === 400) {
      return response.json()
    } else {
      throw Error(response.statusText)
    }
  }

  useEffect(() => {
    fetch('https://api.disneyapi.dev/characters/1')
      .then(checkError)
  })

  useEffect(() => {
    const charactersFetched = createRandomIds().map(id => fetch(`https://api.disneyapi.dev/characters/${id}`))
    Promise.all(charactersFetched)
      .then(([res1, res2, res3, res4]) =>
        Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
      .then(([data1, data2, data3, data4]) => {
        setOptions([
          { answer: data1.name, isCorrect: true, id: data1._id },
          { answer: data2.name, isCorrect: false, id: data2._id },
          { answer: data3.name, isCorrect: false, id: data3._id },
          { answer: data4.name, isCorrect: false, id: data4._id }
        ])
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div id='question'>
      Game
      <div>
        <h1>¿De qué personaje se trata?</h1>
        <h2>Pregunta 1 de 10</h2>
        <div>
          {/* <img className='character' src={character.imageUrl} alt='character' /> */}
        </div>
      </div>
      <div id='answers'>
        {options.map(option => (
          <h3 key={option.id}>{option.answer}</h3>
        ))}
        {console.log(options)}
      </div>
    </div>
  )
}

export default Game
