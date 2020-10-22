const { posts, users, comments } = require('./demo data')
const { GraphQLServer } = require('graphql-yoga')

// Scalar types: string, boolean, int, float, ID

//holding in lectures:
//www.udemy.com/course/graphql-bootcamp/learn/lecture/11838226#questions

//Type Definition (Schema)

https: const typeDefs = `
type Query {

greeting(name: String): String,
users(query: String):[User!]!, 
me: User!,
grades: [Int!]!,
add(numbers: [Float!]!): Float!,
posts(query: String):[Post!]
comments: [Comment!]! ,

}


type User {
id: ID!
name: String!
email: String
posts: [Post!]!
}

type Post {
id: ID!
name: String
email: String 
content: String
body: String
author: User! 
}
type Comment {
id: ID!
comment: String!
author: User!
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

  //end of Query 

  Post: {
    author(parent, args, ctx, info) {
      console.log('author parent:', parent)
      return users.find((user) => {
        return user.id === parent.author
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
  },
  Comment: {
    author(parent, args) {

      console.log(`parent of 'author within comment':`, parent)

      return users.find((user) => { return user.name === parent.author })


    }
  }
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
