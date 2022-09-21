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

afterAll(() => {
  mongoose.connection.close()
})
