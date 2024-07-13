const User = require('../../models/user')
const { authToken } = require('../utils/token')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const clear = (token) => {
        return res.status(200).send({
                state: true,
                message: "Login Successful",
                token: token
            }) 
            
    }
    const fail = () => {
        return res.status(401).send({
                state: false,
                message: "Invalid Credentials"
            })
    }

    try {
        
        const user = await User.findOne({ email })

        let dbPassword
        if (user) dbPassword = user.password
        else return fail()

        const match = await bcrypt.compare(password, dbPassword);
        if (match) {
            const token = authToken(user._id)
            return clear(token)
        }
        else {
            return fail()
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            state: false,
            message: "Internal Server Error"
        })
    }

}