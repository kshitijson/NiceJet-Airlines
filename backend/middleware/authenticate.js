require('dotenv').config({ path: '../.env' });

const authUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token === null) return res.sendStatus(401)

    // jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    //     if (err) return res.sendStatus(403)
    //     req.user = user
    //     next()
    // })

    req.user = authHeader
    next()
}

module.exports = {authUser}