const listHelper = require("../utils/list_helper")

const exampleBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
]

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
