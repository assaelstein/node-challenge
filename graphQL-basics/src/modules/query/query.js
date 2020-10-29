const getEntry = require('../../utils/mySql/getEntry')
const { tables } = require('../../config/index')


const postsQuery = async () => {

    let posts = await getEntry(['*'], tables.Posts.name)

    console.log(posts)


    if (args.query) {
        console.log('query:', args.query)


        console.log('posts', posts)
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

}


const usersQuery = async () => {

    let users = await getEntry(['*'], tables.Users.name)

    if (!args.query) {
        return users
    } else {
        return users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    }
}



module.exports = { postsQuery, usersQuery }