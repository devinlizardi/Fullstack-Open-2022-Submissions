const totalLikes = (blogs) => {
  let total = 0

  blogs.forEach((el) => {
    total += el.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let { title, author, likes } = blogs[0]

  blogs.forEach((el) => {
    if (el.likes >= likes) {
      title = el.title
      author = el.author
      likes = el.likes
    }
  })

  return { title: title, author: author, likes: likes }
}

module.exports = { totalLikes, favoriteBlog }
