var express = require("express");
const router = express.Router();
const Order = require("../../modal/orderschema");

//----------------------------------------------------post makaj Order api------------------------------------------------------------------------
router.post("/order", async (req, res) => {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;
    const weight = req.body.weight;
    const dimensions = req.body.dimensions;
    const date = req.body.date;
    const productId = req.body.productId;

    const userId = req.body.userId;
    try {
        let order = await Order.findOne({ userId });

        if (order) {
            Order.activeproducts.push({
                productId,
                date,
                title,
                price,
                image,
                description,
                weight,
                dimensions,
            });
            order = await Order.save();
            return res.status(200).send(Order);
        } else {
            //no Order for user, create new Order
            const newOrder = await Order.insertMany({
                userId,
                activeproducts: [
                    {
                        productId,
                        count,
                        title,
                        price,
                        image,
                        description,
                        weight,
                        dimensions,
                    },
                ],
                ordered: [],
            });

            return res.status(200).send(newOrder);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
//----------------------------------------------------get Order api-------------------------------------------------------------------------

router.get("/order/:userId", (req, res) => {
    Order.find({ userId: req.params.userId }, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
    console.log(req.params.userId);
});

router.post("/orderdelete", (req, res) => {
    Order.updateOne(
        { userId: req.body.userId },
        { $pull: { activeproducts: { _id: req.body.id } } },
        (err, user) => {
            if (err) {
                return res.status(500).send({ err: err });
            }
            return res.status(200).send({ user: user });
        }
    );
});



module.exports = router;
