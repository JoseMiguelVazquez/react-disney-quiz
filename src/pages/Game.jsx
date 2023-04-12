import React, { useState, useEffect, useRef } from 'react'
import { createRandomIds, shuffle } from '../utils/functions.js'
import Loading from '../components/Loading'
import { motion, AnimatePresence } from 'framer-motion'

const Game = () => {
  const totalQuestions = 10
  const timePerQuestion = 10

  const [correct, setCorrect] = useState(null)
  const [options, setOptions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameHasEnded, setGameHasEnded] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(true)
  const [remainingTime, setRemainingTime] = useState(timePerQuestion)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasFetchData = useRef(false)

  useEffect(() => {
    function fetchData () {
      const charactersFetched = createRandomIds().map(id => fetch(`https://api.disneyapi.dev/character/${id}`))
      Promise.all(charactersFetched)
        .then(([res1, res2, res3, res4]) =>
          Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
        .then(([data1, data2, data3, data4]) => {
          setCorrect(data1.data)
          setOptions(shuffle([
            { answer: data1.data.name, isCorrect: true, id: data1.data._id },
            { answer: data2.data.name, isCorrect: false, id: data2.data._id },
            { answer: data3.data.name, isCorrect: false, id: data3.data._id },
            { answer: data4.data.name, isCorrect: false, id: data4.data._id }
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) setRemainingTime((prev) => prev - 1)
      if (remainingTime === 1 && isPlaying) {
        const btnCorrect = document.querySelector('.btn-correct')
        setBtnDisabled(true)
        btnCorrect.classList.add('btn-choose-correct')
        nextQuestion()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [remainingTime])

  function nextQuestion () {
    setTimeout(() => {
      hasFetchData.current = false
      setCurrentQuestion(currentQuestion + 1)
      setShowMenu(false)
      setBtnDisabled(false)
    }, 1000)
    setTimeout(() => {
      setShowMenu(true)
      setRemainingTime(timePerQuestion)
    }, 1500)
    setTimeout(() => {
      if (currentQuestion === totalQuestions) {
        setIsPlaying(false)
        setBtnDisabled(false)
        setGameHasEnded(true)
      }
    }, 1500)
  }

  function handleAnswer (isCorrect, event) {
    const btnCorrect = document.querySelector('.btn-correct')
    if (isCorrect) {
      setScore(score + 1)
      event.target.classList.add('btn-choose-correct')
    } else {
      event.target.classList.add('btn-choose-incorrect')
      btnCorrect.classList.add('btn-choose-correct')
    }
    setBtnDisabled(true)
    nextQuestion()
  }

  function handleStart () {
    setIsPlaying(true)
    setShowMenu(false)
    setScore(0)
    setGameHasEnded(false)
    setCurrentQuestion(currentQuestion + 1)
    setTimeout(() => {
      setShowMenu(true)
      setRemainingTime(timePerQuestion)
    }, 500)
  }

  function handleEnding () {
    setShowMenu(false)
    setCurrentQuestion(0)
    setTimeout(() => {
      setShowMenu(true)
    }, 500)
  }

  if (currentQuestion === 0) {
    return (
      <div className='custom-wrapper d-flex flex-column align-items-center justify-content-center py-5'>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.2, damping: 12 }}
              exit={{ x: '200vw', opacity: 0 }}
              id='begin-menu'
              className='col-11 col-sm-8 col-xl-6 col-xxl-4 card d-flex justify-content-center'
            >
              <div className='text-center my-3'>
                <h1>Character Game</h1>
                <p>Choose the correct character name from the options</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className='btn btn-custom col-6' onClick={() => (handleStart())}
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
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.2, damping: 12 }}
              exit={{ x: '-100vw', opacity: 0 }}
              id='end-menu'
              className='col-11 col-sm-8 col-xl-6 col-xxl-4 card d-flex justify-content-center'
            >
              <div className='text-center my-3'>
                <h1>Complete!</h1>
                <h2 className='mb-2'>Score: {score}/{totalQuestions} </h2>
                {score > (totalQuestions * 0.7)
                  ? <h4>You are a Disney Guru!</h4>
                  : score > (totalQuestions * 0.5)
                    ? <h4>Good Job!</h4>
                    : <h4>Keep Trying!</h4>}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className='btn btn-custom col-6 mt-2' onClick={() => (handleEnding())}
                >
                  Play Again!
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className='custom-wrapper d-flex flex-column align-items-center justify-content-center py-5'>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.2, damping: 12 }}
            exit={{ x: '200vw', opacity: 0 }}
            id='question'
            className='col-11 col-sm-9 col-xl-7 col-xxl-5 card p-2'
          >
            <div className='position-absolute mt-5 ms-1 ms-sm-3 ms-md-4 ms-lg-5'>
              <svg width='50' height='50'>
                <AnimatePresence>
                  {!btnDisabled && (
                    <motion.circle
                      initial={{ pathLength: 1 }}
                      animate={{ pathLength: 0 }}
                      transition={{ duration: 10, ease: 'easeInOut' }}
                      exit={{
                        pathLength: 1,
                        opacity: 0,
                        transition: { duration: 0.1, ease: 'easeInOut' }
                      }}
                      r='15'
                      cx='25'
                      cy='25'
                      stroke='rgb(37, 18, 131)'
                      fill='none'
                      strokeWidth='5px'
                    />
                  )}
                </AnimatePresence>
              </svg>
            </div>
            <div className='text-center mt-4 d-flex flex-column align-items-center'>
              <h2>What is this character's name?</h2>
              <h3>Question {currentQuestion} of {totalQuestions}</h3>
            </div>
            <div className='d-flex flex-wrap mb-4'>
              <div className='ps-3 col-12 col-sm-6 text-center d-flex flex-column justify-content-center align-items-center'>
                {loading
                  ? <Loading />
                  : <img
                      className='character mb-2'
                      src={correct?.imageUrl}
                      alt='character'
                    />}
                {/* <span>Remaining Time: {remainingTime}</span> */}
              </div>
              <div id='answers' className='d-flex flex-column justify-content-center align-items-start col-12 col-sm-6 pe-5'>
                {options.map(option => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`btn btn-custom m-2 w-100 text-start btn-${option.isCorrect ? 'correct' : 'incorrect'}`}
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
