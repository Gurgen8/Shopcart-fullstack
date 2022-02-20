import User from "../models/User"
import CryptoJS from "crypto-js";
import authSchem from "../validation/validate"
import jwt from "jsonwebtoken";

class Authentication {

    static register = async (req, res) => {

        try {
            await authSchem.validateAsync(req.body)
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSWORD).toString(),
                comparePassword: CryptoJS.AES.encrypt(req.body.comparePassword, process.env.SECRET_PASSWORD).toString()

            })
            await newUser.save()
            res.status(200).json(newUser)


        } catch (error) {

            res.status(500).json(error)

        }
    };


    static login = async (req, res) => {

        try {

            const user = await User.findOne({ username: req.body.username })
            !user && res.status(401).json("not user")


            const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASSWORD)
            const validPassword = hashPassword.toString(CryptoJS.enc.Utf8)
            validPassword !== req.body.password && res.status(401).json("wrong password")

            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,

            },
                process.env.JWT_SECRET, { expiresIn: "1d" }
            )

            user.accessToken = accessToken

            res.status(200).json(user)


        } catch (error) {

            res.status(500).json(error)

        }
    }


}


export default Authentication