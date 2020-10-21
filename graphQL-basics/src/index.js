const { GraphQLServer } = require('graphql-yoga')

// Scalar types: string, boolean, int, float, ID

//Type Definition (Schema)

const typeDefs = `
type Query {
greeting(name: String): String
me: User!
he: Post
id: String
grades: [Int!]!
add(x: Float!, y: Float!): Float!
}


type User {
id: ID!
name: String!
email: String

}

type Post {
    pat: String!
    hat: Boolean
    id: String
}

`

//Resolvers

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      console.log(args)
      if (args.name) {
        return `Hello ${args.name}`
      }
      return 'Hello!'
    },

    add(undefined, args) {
      console.log(args)
      return args.x + args.y
    },
    grades(parent, args, ctx, info){
return [613, 365, 7]
  },
  me() {
    return {
      id: '3423',
      name: 'Assael',
      email: 'hiEmail',
    }
  },
  he() {
    return {
      pat: 'blackandwhitecat',
      hat: true,
    }
  },
},


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
