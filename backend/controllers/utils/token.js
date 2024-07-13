require('dotenv').config({ path: '../../.env' })

const jwt = require("jsonwebtoken")


const authToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN)
    return accessToken
}

const authenticate = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        return decoded.userId
    } catch (error) {
        return null
    }
}

module.exports = { authToken, authenticate }