const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('viewing all blog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('First class tests')
  })

  test('blogs returned have an id property', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body
    contents.forEach(blog => {
      expect(blog.id).toBeDefined()
    })

  })
})

describe('adding a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'a blog',
      author: 'John Doe',
      url: 'doe.com',
      likes: 22
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('a blog')

  })

  test('if likes are missing defaults to 0', async () => {
    const newBlog = {
      title: 'a blog',
      author: 'John Doe',
      url: 'doe.com'
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.body.likes).toBe(0)
  })

  test('if title is missing returns error', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'doe.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('if url is missing returns error', async () => {
    const newBlog = {
      title: 'a blog',
      author: 'John Doe'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('viewing a single blog', () => {
  test('succeeds with a valid id', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogObjs = allBlogs.body
    const blogToView = blogObjs[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with a statuscode 400 if id is invalid', async () => {
    const invalidId = 'random'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('deleting a single blog', () => {
  test('suceeds with a status code 204 if id is valid', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogsObjs = allBlogs.body
    const blogToDelete = blogsObjs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const newBlogs = await api.get('/api/blogs')
    const newBlogsArr = newBlogs.body

    expect(newBlogsArr).toHaveLength(helper.initialBlogs.length - 1)

    const titles = newBlogsArr.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a single blog', () => {
  test('succeeds with a status code 200 if id is valid', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogsObjs = allBlogs.body
    const blogToUpdate = blogsObjs[0]

    const newBlog = {
      title: 'a blog',
      author: 'John Doe',
      url: 'doe.com'
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe('a blog')
  })

  test('fails with a status code 400 if id is invalid', async () => {
    const invalidId = 'random'

    const newBlog = {
      title: 'a blog',
      author: 'John Doe',
      url: 'doe.com'
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(newBlog)
      .expect(400)

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
