import React, { useState, useEffect, useRef } from 'react'
import { createRandomIds, shuffle } from '../utils/functions.js'

const Game = () => {
  const [correct, setCorrect] = useState(null)
  const [options, setOptions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [gameHasEnded, setGameHasEnded] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const hasFetchData = useRef(false)

  const totalQuestions = 5

  useEffect(() => {
    function fetchData () {
      const charactersFetched = createRandomIds().map(id => fetch(`https://api.disneyapi.dev/characters/${id}`))
      Promise.all(charactersFetched)
        .then(([res1, res2, res3, res4]) =>
          Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
        .then(([data1, data2, data3, data4]) => {
          setCorrect(data1)
          setOptions(shuffle([
            { answer: data1.name, isCorrect: true, id: data1._id },
            { answer: data2.name, isCorrect: false, id: data2._id },
            { answer: data3.name, isCorrect: false, id: data3._id },
            { answer: data4.name, isCorrect: false, id: data4._id }
          ]))
        })
        .catch(error => {
          console.log(error)
        })
    }
    if (hasFetchData.current === false) {
      fetchData()
      hasFetchData.current = true
    }
  }, [currentQuestion])

  function handleAnswer (isCorrect, event) {
    const btnCorrect = document.querySelector('.btn-correct')
    event.target.classList.remove('btn-light')
    if (isCorrect) {
      setScore(score + 1)
      event.target.classList.add('btn-success')
    } else {
      event.target.classList.add('btn-danger')
      btnCorrect.classList.remove('btn-light')
      btnCorrect.classList.add('btn-success')
    }
    setBtnDisabled(true)
    setTimeout(() => {
      if (currentQuestion === totalQuestions) {
        setGameHasEnded(true)
      } else {
        hasFetchData.current = false
        setCurrentQuestion(currentQuestion + 1)
      }
      setBtnDisabled(false)
    }, 1000)
  }

  if (gameHasEnded) {
    return (
      <div className='custom-wrapper d-flex flex-column align-items-center justify-content-center'>
        <div className='col-11 col-sm-8 card'>
          <div className='text-center my-3'>
            <h1>Complete!</h1>
            <h2 className='mb-3'>Score: {score}/{totalQuestions} </h2>
            <button className='btn btn-light' onClick={() => (window.location.href = '/game-1')}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='custom-wrapper d-flex flex-column align-items-center justify-content-center'>
      <div id='question' className='col-11 col-sm-8 card'>
        <div className='text-center mt-3 d-flex flex-column align-items-center'>
          <h1>What is this character's name?</h1>
          <h3>Question {currentQuestion} of {totalQuestions}</h3>
          <div className='mb-3 col-10'>
            <img
              className='character'
              src={correct?.imageUrl}
              alt='character'
            />
          </div>
        </div>
        <div id='answers' className='d-flex flex-column mb-3'>
          {options.map(option => (
            <button
              className={`btn btn-light m-2 btn-${option.isCorrect ? 'correct' : 'incorrect'}`}
              key={option.id}
              onClick={(event) => handleAnswer(option.isCorrect, event)}
              disabled={btnDisabled}
            >
              {option.answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game
