
const users = [
    {
        id: '1',
        name: 'Dovid',
        email: 'ttt@ttt',
    },
    { id: '2', name: 'Shalom', email: 'example@tm.com' },
]

const posts = [
    { name: 'post1', id: '1', email: 'gm', body: 'the parsha of the week is Lech Lecha', author: '1' },
    { name: 'post2', id: '2', email: 'yh', body: 'the parsha of the week is VaEira', author: '1' },
    { name: 'post3', id: '3', email: 'ol', body: 'the parsha of the week is Noach', author: '2' },
]

const comments = [
    { id: '620', comment: 'Complete torah', author: 'Dovid' }, { id: '619', comment: 'one less', author: 'Dovid' }, { id: '618', comment: '18 is life!!', author: 'Shalom' }, { id: '617', comment: '17 is good!!', author: 'Shalom' }
]

module.exports = { users, posts, comments }