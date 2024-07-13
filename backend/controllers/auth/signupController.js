const User = require('../../models/user')
const bcrypt = require('bcrypt')
 

exports.signup = async (req, res) => {

    const { username, email, password } = req.body

    // checking if user already exists
    try {
        const userFind = await User.find({email: email})
        if (userFind.length > 0) {
            return res.status(409).send({
                status: false,
                message: "User Already Exists"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        })
    }

    // hashing the password
    const saltRounds = 10
    let hashedPassword = await bcrypt.hashSync(password, saltRounds);

    // adding the user into the database
    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(201).send({
            status: true,
            message: "Registered Successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: "Internal Server Error"
        })
    }

}
