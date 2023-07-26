const BlogForm = ({
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (

    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={newTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
