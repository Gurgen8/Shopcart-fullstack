import Cart from "../models/Cart";

class CartController {

    static createCart = async (req, res) => {

        try {

            const newCart = await new Product(req.body).save()
            res.status(200).json(newCart)
        } catch (err) {
            res.status(500).json(err);
        }

    };

    static updateCart = async (req, res) => {

        try {

            const updateCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updateCart);
        } catch (err) {
            res.status(500).json(err);
        }


    };

    static deleteCart = async (req, res) => {

        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json("Cart has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    };


    static getCart = async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }


    };


    static getAll = async (req, res) => {

        try {

            const carts = await Cart.find()
            res.status(200).json(carts)


        } catch (error) {

            res.status(500).json(error)

        }



    }





}

export default CartController