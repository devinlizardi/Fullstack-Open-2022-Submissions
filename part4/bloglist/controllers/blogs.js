const blogRouter = require("express").Router()
const Blog = require("./../models/blog")
const User = require("./../models/user")

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
  const body = req.body

  if (!body.title && !body.url) { 
    res.status(400).end()
    return
  }

  const user = await User.findById(body.userId)
  if (!user) { return res.status(400).json({ error: "user not found" }).end() }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: !body.likes ? 0 : body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
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
