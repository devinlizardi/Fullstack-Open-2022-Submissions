const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0

  blogs.forEach(el => {
    total += el.likes
  })

  return total
}

module.exports = { dummy, totalLikes }