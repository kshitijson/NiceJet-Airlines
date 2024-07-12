const { User } = require('../Database/db')
const bcrypt = require('bcrypt')
 
// 1 --> Internal Server Error
// 0 --> Success
// -1 --> User Exists
const signup = async (username, email, password) => {

    try {
        const userFind = await User.find({email: email})
        if (userFind.length > 0) return -1
    } catch (error) {
        console.log(error)
        return 1
    }

    const saltRounds = 10
    let hashedPassword = await bcrypt.hashSync(password, saltRounds);

    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return 0
    }
    catch (error) {
        console.log(error)
        return 1
    }

}

module.exports = {signup}