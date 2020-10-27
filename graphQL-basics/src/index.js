const { posts, users, comments } = require('./demo data')
const { dissoc } = require('ramda')
const { GraphQLServer } = require('graphql-yoga')
const casual = require('casual')


//remove the 'name' key in posts nad replace with 'title'

// const a = posts.forEach((post) => {  
// //   return (Object.keys(post).map === 'name') ? "title" : "name"
// // })

// posts.forEach((post)=>{Object.entries(post)})
const c = dissoc('name', posts[0])
console.log(c)
const b = posts.map((post) => { return dissoc('name', post) })


// posts.forEach((post) => { return dissoc('name', post) })
console.log('b:', b)
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
  createUser(name:String!, email: String!, age: Int): User!,
  createPost (name:String!, body:String!, published:Boolean!,author: String!): Post!

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

          console.log('title:', queryTitle)
          console.log('body', queryBody)

          return queryTitle || queryBody
        })
      } else {
        return posts
      }
      console.log(posts)
      return posts
    },

    greeting(parent, args, ctx, info) {
      console.log(args)
      if (args.name) {
        return `Hello ${args.name}`
      }
      return 'Hello!'
    },

    add(undefined, args) {
      console.log(args)
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

  Mutation: {
    createUser(paret, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.email)

      if (emailTaken) {
        throw new Error('email takn!')
      }

      const user = {
        id: casual.uuid,
        name: args.name,
        email: args.email,
        age: args.age,
      }

      users.push(user)

      console.log(user)

      return user

    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author)

      if (!userExists) {
        throw new Error('user not found')
      }

      const post = {
        id: casual.uuid,
        name: args.name,
        body: args.body,
        published: args.published,
        author: args.author
      }
      console.log(posts)

      posts.push(post)
      console.log(posts)

    }
  },

  Post: {
    author(parent, args, ctx, info) {
      console.log('author parent:', parent)
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comment(parent, arg) {
      return comments.find((comment) => {
        const toReturn = parent.id === comment.postId
        console.log(toReturn)
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
      console.log('comment is being called!!')
      return users.find((user) => {
        return user.name === parent.author
      })
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

//notes

// ! -> can't return null

// type Post {
//   pat: String!
//   hat: Boolean
// }
// Post() {
//   return {
//     pat: 'blackandwhitecat',
//     hat: true,
//   }
// },
