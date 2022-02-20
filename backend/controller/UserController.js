import User from "../models/User";
import CryptoJS from "crypto-js";


class UserController {

    static updateUser = async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSWORD).toString()

        }
        try {

            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body

            }, { new: true })


            res.status(200).json(updateUser)

        } catch (error) {

            res.status(500).json(error)

        }
    };

    static deleteUser = async (req, res) => {

        try {

            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted!")

        } catch (error) {

            res.status(500).json(error)

        }
    };

    static getUser = async (req, res) => {

        try {

            const user = await User.findById(req.params.id);

            res.status(200).json(user)

        } catch (error) {

            res.status(500).json(error)

        }
    };


    static getAllUsers = async (req, res) => {

        try {
            const query = req.query.new
            const users = query ? await User.find({}).sort({ _id: -1 }).limit(5) : await User.find({})
            res.status(200).json(users)
        } catch (error) {

            res.status(500).json(error)

        }

    };

    static getState = async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                { $project: { month: { $month: "$createdAt" }, }, },
                { $group: { _id: "$month", total: { $sum: 1 }, }, },
            ]);
            res.status(200).json(data)

        } catch (err) {
            res.status(500).json(err);
        }


    };

}

export default UserController