var express = require("express");
const router = express.Router();
const Med_data = require("../../modal/schema");

//----------------------------------------------------post makaj api------------------------------------------------------------------------
router.post("/product", (req, res) => {
  Med_data.insertMany(
    {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      weight: req.body.weight,
      size: req.body.dimensions,
      category: req.body.category,
      short: req.body.short,
    },
    (err, user) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.status(200).send(user);
    }
  );

  //------------------------------------------------get image url-------------------------------------------------------------------

  //------------------------------------------------upload image in mongo-----------------------------------------------------------
});
//----------------------------------------------------get meds api-------------------------------------------------------------------------

router.get("/product", (req, res) => {
  Med_data.find({}, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});
router.get("/detail/:productid", (req, res) => {
  Med_data.find({_id:req.params.productid}, (err, user) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    return res.status(200).send({ user: user });
  });
});
module.exports = router;
