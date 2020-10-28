//let { posts, users, comments } = require('./demo data')
const { dissoc } = require('ramda')
const { GraphQLServer } = require('graphql-yoga')
const casual = require('casual')
const setUpDbandTables = require('./utils/mySql/index')

let users
let posts
let comments

setUpDbandTables()

users = [
  {
    id: '1',
    name: 'Dovid',
    email: 'ttt@ttt',
  },
  { id: '2', name: 'Shalom', email: 'example@tm.com' },
]

posts = [
  {
    name: 'post1',
    id: '1',
    email: 'gm',
    body: 'the parsha of the week is Lech Lecha',
    author: '1',
  },
  {
    name: 'post2',
    id: '2',
    email: 'yh',
    body: 'the parsha of the week is VaEira',
    author: '1',
  },
  {
    name: 'post3',
    id: '3',
    email: 'ol',
    body: 'the parsha of the week is Noach',
    author: '2',
  },
]

comments = [
  {
    id: '620',
    comment: 'Complete torah',
    author: 'Dovid',
    post: posts[0].id,
  },
  { id: '619', comment: 'one less', author: 'Dovid', post: posts[1].id },
  { id: '618', comment: '18 is life!!', author: 'Shalom', post: posts[2].id },
  { id: '617', comment: '17 is good!!', author: 'Shalom2', post: posts[1].id },
]

//remove the 'name' key in posts nad replace with 'title'

// const one = {
//   name: "Perth"

// }

// const two = {
//   pop: 1.5,
//   ...one
// }

// console.log(two)

// const a = posts.forEach((post) => {
// //   return (Object.keys(post).map === 'name') ? "title" : "name"
// // })

// posts.forEach((post)=>{Object.entries(post)})
// const c = dissoc('name', posts[0])
// console.log(c)
// const b = posts.map((post) => { return dissoc('name', post) })

// posts.forEach((post) => { return dissoc('name', post) })
// console.log('b:', b)
// console.log('d:', posts)
// Scalar types: string, boolean, int, float, ID

//holding in lectures:
//www.udemy.com/course/graphql-bootcamp/learn/lecture/11838226#questions

//Type Definition (Schema)

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
  createUser(data: CreateUserInput): User!,
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
  name: String!
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
      if (!args.query) {
        return users
      } else {
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
      }
    },

    posts(undefined, args) {
      if (args.query) {
        console.log('query:', args.query)
        return posts.filter((post) => {
          console.log(post.name)

          const queryTitle = post.name
            .toLowerCase()
            .includes(args.query.toLowerCase())
          const queryBody = post.body
            .toLowerCase()
            .includes(args.query.toLowerCase())

          // console.log('title:', queryTitle)
          // console.log('body', queryBody)

          return queryTitle || queryBody
        })
      } else {
        return posts
      }
      // console.log(posts)
    },

    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`
      }
      return 'Hello!'
    },

    add(undefined, args) {
      if (args.numbers.length === 0) {
        return 0
      } else {
        return args.numbers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        })
      }
    },
    grades(parent, args, ctx, info) {
      return [613, 365, 7]
    },
    me() {
      return {
        id: '3423',
        name: 'Assael',
        email: 'hiEmail',
      }
    },

    comments(parent, args) {
      return comments
    },
  },

  //MUTATION

  Mutation: {
    createUser(paret, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email)

      if (emailTaken) {
        throw new Error('email takn!')
      }

      const user = {
        id: casual.uuid,
        ...args.data,
        // name: args.name,
        // email: args.email,
        // age: args.age,
      }

      users.push(user)

      // console.log(user)

      return user
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

      posts.push(post)

      console.log('post made!!', post)

      return post
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
        console.log('comment made!', comment)
        comments.push(comment)

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
