import React, { useState, useEffect, useRef } from 'react'
import { createRandomIds, shuffle } from '../utils/functions.js'
import Loading from '../components/Loading'
import { motion, AnimatePresence } from 'framer-motion'

const Game = () => {
  const [correct, setCorrect] = useState(null)
  const [options, setOptions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameHasEnded, setGameHasEnded] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showQuestion, setShowQuestion] = useState(true)
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
          setLoading(false)
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
      hasFetchData.current = false
      setCurrentQuestion(currentQuestion + 1)
      setShowQuestion(false)
      setBtnDisabled(false)
    }, 1000)
    setTimeout(() => {
      setShowQuestion(true)
    }, 1500)
    setTimeout(() => {
      if (currentQuestion === totalQuestions) {
        setGameHasEnded(true)
      }
    }, 1500)
  }

  function handleStart () {
    setShowQuestion(false)
    setScore(0)
    setGameHasEnded(false)
    setCurrentQuestion(currentQuestion + 1)
    setTimeout(() => {
      setShowQuestion(true)
    }, 500)
  }

  if (currentQuestion === 0) {
    return (
      <div className='custom-wrapper d-flex flex-column align-items-center justify-content-center py-5'>
        <AnimatePresence>
          {showQuestion && (
            <motion.div
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.2, damping: 12 }}
              exit={{ x: '200vw', opacity: 0 }}
              id='begin-menu'
              className='col-11 col-sm-8 col-xl-6 col-xxl-4 card d-flex justify-content-center'
            >
              <div className='text-center my-3'>
                <h1>Game 1</h1>
                <p>Choose the correct character name from the options</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className='btn btn-light btn-custom col-6' onClick={() => (handleStart())}
                >
                  Begin!
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (gameHasEnded) {
    return (
      <div className='custom-wrapper d-flex flex-column align-items-center justify-content-center py-5'>
        <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 80, delay: 0.2, damping: 12 }}
          id='end-menu'
          className='col-11 col-sm-8 col-xl-6 col-xxl-4 card d-flex justify-content-center'
        >
          <div className='text-center my-3'>
            <h1>Complete!</h1>
            <h2 className='mb-3'>Score: {score}/{totalQuestions} </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className='btn btn-light col-6' onClick={() => (setCurrentQuestion(0))}
            >
              Play Again!
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className='custom-wrapper d-flex flex-column align-items-center justify-content-center py-5'>
      <AnimatePresence>
        {showQuestion && (
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.2, damping: 12 }}
            exit={{ x: '200vw', opacity: 0 }}
            id='question'
            className='col-11 col-sm-9 col-xl-7 col-xxl-5 card p-2'
          >
            <div className='text-center mt-4 d-flex flex-column align-items-center'>
              <h1>What is this character's name?</h1>
              <h3>Question {currentQuestion} of {totalQuestions}</h3>
            </div>
            <div className='d-flex flex-wrap mb-4'>
              <div className='ps-3 col-12 col-sm-6 text-center d-flex justify-content-center align-items-center'>
                {loading
                  ? <Loading />
                  : <img
                      className='character mb-2'
                      src={correct?.imageUrl}
                      alt='character'
                    />}
              </div>
              <div id='answers' className='d-flex flex-column justify-content-center align-items-start col-12 col-sm-6 pe-5'>
                {options.map(option => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`btn btn-light m-2 w-100 text-start btn-${option.isCorrect ? 'correct' : 'incorrect'}`}
                    key={option.id}
                    onClick={(event) => handleAnswer(option.isCorrect, event)}
                    disabled={btnDisabled}
                  >
                    {option.answer}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Game
