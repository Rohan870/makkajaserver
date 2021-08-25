var express = require("express");
const router = express.Router();
const Cart = require("../../modal/cartschema");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/cart", async (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const price = req.body.price;
  const weight = req.body.weight;
  const dimensions = req.body.dimensions;
  const count = req.body.count;
  const productId = req.body.productId;

  const userId = req.body.userId;
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.count = count;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({
          productId,
          count,
          title,
          price,
          image,
          description,
          weight,
          dimensions,
        });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.insertMany({
        userId,
        products: [
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
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
//----------------------------------------------------get cart api-------------------------------------------------------------------------

router.get("/cart/:userId", (req, res) => {
  Cart.find({ userId: req.params.userId }, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
  console.log(req.params.userId);
});

router.post("/cartdelete", (req, res) => {
  Cart.updateOne(
    { userId: req.body.userId },
    { $pull: { products: { _id: req.body.id } } },
    (err, user) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.status(200).send({ user: user });
    }
  );
});

router.put("/cart", (req, res) => {
  Cart.updateOne(
    {
      userId: req.body.userId,
      "products._id": req.body.id,
    },
    { $set: { "products.$.count": req.body.count } },

    (err, user) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.status(200).send({ user: user });
    }
  );
});

module.exports = router;
