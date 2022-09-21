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

afterAll(() => {
  mongoose.connection.close()
})
