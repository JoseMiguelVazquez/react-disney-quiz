export function createRandomIds () {
  const ids = []
  for (let i = 0; i < 4; i++) {
    // ids.push((Math.floor(Math.random() * 7238) + 200))
    ids.push(Math.floor(Math.random() * 731))
    // 7438 characters, but there are some missing ids in the first 200
    // ids.push(1 + i)
  }
  //   console.log(ids)
  return ids
}

export function createRandomId () {
  const id = Math.floor(Math.random() * 731)
  return id
}

export function shuffle (array) {
  // console.log(array)
  const shuffledArray = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  const shuffledAlphabet = addAlphabet(shuffledArray)
  // console.log(shuffledAlphabet)
  return shuffledAlphabet
}

function addAlphabet (array) {
  const alphabet = 'abcd'
  return array.map((element, index) => {
    return { answer: `${alphabet.slice(index, index + 1)}) ${element.answer}`, isCorrect: element.isCorrect, id: element.id }
  })
}

// { answer: data1.name, isCorrect: true, id: data1._id }
