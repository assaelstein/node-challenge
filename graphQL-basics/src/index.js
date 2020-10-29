// let { posts, users, comments } = require('./demo data')
const { dissoc } = require('ramda')
const { GraphQLServer } = require('graphql-yoga')
const casual = require('casual')
const { setUpDbandTables, addEntry, getEntry } = require('./utils/mySql/index')
const { tables } = require('./config')
const { postsQuery, usersQuery } = require('./modules/query/query')

setUpDbandTables()


const typeDefs = `
type Query {

greeting(name: String): String,
users(query: String):[User!]!, 
me: User!,
grades: [Int!]!,
add(numbers: [Float!]!): Float!,
posts(query: String):[Post!]
comments: [Comment!]! ,

}
type Mutation {
  createUser(name: String!, email: String!, age: Int): User!,
  deleteUser(id:ID!):User!
  createPost (data: CreatePostInput): Post!
  createComment (data: CreateCommentInput ): Comment!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int

}
input CreatePostInput {
  name: String
  body: String!
  published: Boolean
  author: String!
}

input CreateCommentInput {
  comment: String!,
   author: String!,
    post: String!
}


type User {
id: ID!
name: String!
email: String
posts: [Post!]!
comments: [Comment!]!
}

type Post {
id: ID!
name: String
email: String 
content: String
body: String
author: User! 
published: Boolean
comment: Comment
}
type Comment {
id: ID!
comment: String!
author: User!
post: Post!
}


`

//Resolvers

const resolvers = {
  Query: {
    users(undefined, args) {
      const usersQuery = async () => {
        const result = await getEntry(['*'], tables.Users.name)
        let users = [result]
        if (!args.query) {
          return users
        } else {
          return users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
          })
        }
      }
      usersQuery()
    },

    posts(parent, args) {
      const postsQuery = async () => {
        const result = await getEntry(['*'], tables.Posts.name)
        let posts = [result]
        if (args.query) {
          return posts.filter((post) => {
            const queryTitle = post.name
              .toLowerCase()
              .includes(args.query.toLowerCase())
            const queryBody = post.body
              .toLowerCase()
              .includes(args.query.toLowerCase())

            return queryTitle || queryBody
          })
        } else {
          console.log('return !!!')
          console.log(posts)
          return posts[0]
        }
      }
      postsQuery()
    },

    comments(parent, args) {
      const commentsQuery = async () => {
        const result = await getEntry(['*'], tables.Posts.name)
        let comments = [result]
        return comments
      }

      commentsQuery()
    },
  },

  //MUTATION

  Mutation: {
    createUser(parent, args, ctx, info) {
      console.log('args^^^^^^^^^^^^', args)

      const makeUser = async () => {
        console.log('MAKE USER!!!!!!---1')

        // const result = await getEntry(['*', tables.Users.name])
        // if (result !== 'undefined') {

        //   const emailTaken = users.some((user) => user.email === args.data.email)

        //   if (emailTaken) {
        //     throw new Error('email takn!')
        //   }
        // }
        console.log('MAKE USER!!!!!!---2')
        const user = {
          id: casual.uuid,
          //...args.data,
          name: args.name,
          email: args.email,
          age: args.age,
        }

        // console.log('user:', user)

        await addEntry(tables.Users.name, user)
     

        //users.push(user)

        // console.log(user)

        //return user
      }
      makeUser()
    },

    deleteUser(parent, args) {
      const userIndex = users.findIndex((user) => user.id === args.id)

      // console.log(userIndex)
      console.log(args)

      if (userIndex === -1) {
        throw new Error('user not found!')
      }
      const deletedUsers = users.splice(userIndex, 1)

      posts = posts.filter((post) => {
        const match = post.author === args.id

        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id)

          return !match
        }
      })
      comments = comments.filter((comment) => comment.author !== args.id)

      return deletedUsers[0]
    },

    createPost(parent, args, ctx, info) {
      const makePost = async () => {
        let result = await getEntry(['*'], tables.Users.name)
        console.log(result)

        let users = [result]

        console.log(users)

        const userExists = users.some((user) => user.id === args.data.author)

        if (!userExists) {
          throw new Error('user not found')
        }

        // const post = {
        //   id: casual.uuid,
        //   name: args.name,
        //   body: args.body,
        //   published: args.published,
        //   author: args.author,
        // }

        const post = {
          id: casual.uuid,
          ...args.data,
        }
        addEntry(tables.Posts.name, post)
        //posts.push(post)

        console.log('post made!!', post)


        return post
      }
      makePost()
    },

    createComment(parent, args) {
      //what about user exists?
      const postExists = posts.some((post) => post.id === args.data.post)
      console.log(postExists)
      //why like this, we want to find the post!!!
      if (postExists) {
        const comment = {
          id: casual.uuid,
          ...args.data,
          // comment: args.comment,
          // author: args.author,
          // post: args.post,
        }

        addEntry(tables.Comments.name, comment)
        // console.log('comment made!', comment)
        // comments.push(comment)

        return comment
      } else {
        throw new Error(`post ID doesn't exist!!`)
      }
    },
  },

  Post: {
    author(parent, args, ctx, info) {
      // console.log('author parent:', parent)
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comment(parent, arg) {
      return comments.find((comment) => {
        const toReturn = parent.id === comment.post
        // console.log(toReturn)
        return toReturn
      })
    },
  },
  User: {
    posts(parent, args) {
      console.log('post parent:', parent)
      const toReturn = posts.filter((post) => {
        console.log('in USER')
        return post.author === parent.id
      })
      return toReturn
    },
    comments(parent, args) {
      return comments.filter((comment) => {
        return comment.author === parent.name
        //return all comments that link with the user
      })
    },
  },

  Comment: {
    author(parent, args) {
      // console.log('comment is being called!!')
      return users.find((user) => {
        return user.name === parent.author
      })
    },
    post(parent, args) {
      return posts.find((post) => post.id === parent.post)
    },
  },
}

//listener

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})

//sudo lsof -i :4000
// kill -9 [PID]

// module.exports = {
//   posts,
//   users,
//   comments
// }
