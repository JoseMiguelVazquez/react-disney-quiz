const createRandomIds = () => {
  const ids = []
  for (let i = 0; i < 4; i++) {
    ids.push((Math.floor(Math.random() * 7238) + 200))
    // 7438 characters, but there are some missing ids in the first 200
    // ids.push(1 + i)
  }
  //   console.log(ids)
  return ids
}

export default createRandomIds
