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
  expect(res.body).toHaveLength(exampleBlogs.length)
})

test("the _id param is read as id", async () => {
  const res = await api.get("/api/blogs")
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

test("blog with no likes defaults to 0", async () => {
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

test("blog without title and url is rejected", async () => {
  const emptyBlog = {
    author: "",
    likes: 0
  }

  await api
    .post("/api/blogs")
    .send(emptyBlog)
    .expect(400)
})

test("blog is added and deleted by id", async () => {
  const blogToDelete = {
    title: "End Me",
    author: "Kora",
    url: "https://localhost:4000",
    likes: 80
  }

  await api
    .post("/api/blogs")
    .send(blogToDelete)
    .expect(201)

  const res = await api.get("/api/blogs")
  expect(res.body).toHaveLength(exampleBlogs.length + 1)

  let toDeleteId
  for (let blog of res.body) {
    if (blog.title === "End Me") {
      toDeleteId = blog.id
    }
  }

  await api
    .delete(`/api/blogs/${toDeleteId}`)
    .expect(204)

  const newRes = await api.get("/api/blogs")
  expect(newRes.body).toHaveLength(exampleBlogs.length)

  await api
    .delete(`/api/blogs/${toDeleteId}`)
    .expect(400)
})

test("blog item is added and likes are updated", async () => {
  const needsLove = {
    title: "Come and get your love",
    author: "Redbone",
    url: "youtube it",
    likes: 0
  }

  await api
    .post("/api/blogs")
    .send(needsLove)
    .expect(201)

  const res = await api.get("/api/blogs")
  let toUpdateId
  for (let blog of res.body) {
    if (blog.title === "Come and get your love") {
      toUpdateId = blog.id
    }
  }

  await api
    .put(`/api/blogs/${toUpdateId}`)
    .send({ likes:100 })
    .expect(200)
})

afterAll(() => {
  mongoose.connection.close()
})
