const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("./../app")
const api = supertest(app)
const Blog = require("./../models/blog")
const { exampleBlogs } = require("./test_helper")

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = exampleBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("there are 6 blogs at refresh", async () => {
  const res = await api.get("/api/blogs")
  expect(res.body).toHaveLength(6)
})

test("the _id param is read as id", async () => {
  const res = await api.get("/api/blogs")
  console.log(res.body)
  expect(res.body[0].id).toBeDefined()
  expect(res.body[0]._id).not.toBeDefined()
})

test("adding a new blog is handled", async () => {
  const newBlog = {
    title: "Testing blog",
    author: "Bad Bunny",
    url: "http://localhost:6969",
    likes: 0,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")
  const contents = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(exampleBlogs.length + 1)
  expect(contents).toContain("Testing blog")
})

test("request with no likes defaults to 0", async () => {
  const newBlog = {
    title: "Nobody likes me",
    author: "me",
    url: "http://localhost:0000"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  
  const response = await api.get("/api/blogs")
  for (let blog of response.body) {
    if (blog.title === "Nobody likes me") {
      expect(blog.likes).toBe(0)
      break
    }
  }
})

afterAll(() => {
  mongoose.connection.close()
})
