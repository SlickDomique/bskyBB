/* eslint-disable no-unused-vars */
export const flatten = (arr) => {
  const posts = {}
  if (arr.data.thread.parent) getParents(arr.data.thread.parent, posts)
  posts[arr.data.thread.post.cid] = {
    ...arr.data.thread.post,
    parent: arr.data.thread.parent ? arr.data.thread.parent : null,
  }
  if (arr.data.thread.replies)
    getReplies(
      arr.data.thread.replies,
      { post: arr.data.thread.post, parent: arr.data.thread.parent },
      posts,
    )

  return posts
}

const getParents = (post, collection = {}) => {
  if (!collection[post.post.cid]) {
    collection[post.post.cid] = {
      ...post.post,
      parent: post.parent ? post.parent : null,
    }
  }
  if (post.parent) {
    getParents(post.parent, collection)
  }

  return collection
}

const getReplies = (replies, parent = {}, collection = {}) => {
  replies.forEach((reply) => {
    if (!collection[reply.post.cid]) {
      collection[reply.post.cid] = {
        ...reply.post,
        parent,
      }
    }
    if (reply.replies) {
      getReplies(
        reply.replies,
        {
          post: reply.post,
          parent: parent,
        },
        collection,
      )
    }
  })

  return collection
}

export const getTopPostId = (posts) => {
  if (posts.parent) return getTopPostId(posts.parent)

  return posts.post.uri
}

export const flattenFeed = (feed) => {
  return feed
    .filter((post) => {
      return !post.reason && post.post.record
    })
    .map((post) => {
      if (post.reply) {
        return {
          ...post.reply.parent,
          parent: post.post,
        }
      }
      return {
        ...post.post,
      }
    })
}

export const sortPostsIntoDatedArray = (posts) => {
  const sorted = []
  Object.keys(posts).forEach((key) => {
    sorted.push(posts[key])
  })

  return sorted.sort((a, b) => new Date(a.record.createdAt) - new Date(b.record.createdAt))
}
