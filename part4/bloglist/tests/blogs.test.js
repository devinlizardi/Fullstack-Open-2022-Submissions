const listHelper = require("../utils/list_helper")
const { exampleBlogs } = require('./test_helper')

describe("total likes", () => {
  test("of empty blogs is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("of n >= 1 blogs to be added", () => {
    expect(listHelper.totalLikes(exampleBlogs)).toBe(17)
  })
})

describe("favorite blog", () => {
  const favExample = {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7,
  }

  test("of empty blogs is null", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test("of example blogs to be React Patterns", () => {
    expect(listHelper.favoriteBlog(exampleBlogs)).toEqual(favExample)
  })
})
