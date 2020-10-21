const { GraphQLServer } = require('graphql-yoga')

// Scalar types: string, boolean, int, float, ID


//holding in lectures:
https://www.udemy.com/course/graphql-bootcamp/learn/lecture/11838226#questions


//Demo data
const users = [
  {
    id: '1',
    name: 'Dovid',
    email: 'ttt@ttt',
  },
  { id: '2', name: 'Shalon', email: 'example@tm.com' },
]

const posts = [
  { name: 'Dovid', id: '1', email: 'gm' },
  { name: 'Shaul', id: '2', email: 'yh' },
  { name: 'Shmuel', id: '3', email: 'ol' },
]

//Type Definition (Schema)

const typeDefs = `
type Query {
greeting(name: String): String,
users(query: String):[User!]! 
me: User!
grades: [Int!]!
add(numbers: [Float!]!): Float!
posts:[Post!]
}


type User {
id: ID!
name: String!
email: String
}

type Post {
id: ID!
name: String
email: String 
content: String
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