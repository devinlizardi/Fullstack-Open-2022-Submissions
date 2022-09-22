const blogRouter = require("express").Router()
const Blog = require("./../models/blog")

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
  if (!req.body.title && !req.body.url) { 
    res.status(400).end()
    return
  }
  if (!req.body.likes) { req.body.likes = 0 }

  const blog = new Blog(req.body)
  const result = await blog.save()

  res.status(201).json(result)
})

blogRouter.delete("/:id", async (req, res) => {
  const result = await Blog.findByIdAndDelete(req.params.id)
  if (!result) {
    res.status(400).send("bad id").end()
    return
  }
  res.status(204).end()
})

blogRouter.put("/:id", async (req, res) => {
  const updatedBlog = {
    likes: req.body.likes
  }

  const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
  res.status(200).json(result).end()
})

module.exports = blogRouter
