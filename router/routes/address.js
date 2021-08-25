var express = require("express");
const router = express.Router();
const Address = require("../../modal/address");

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/address", async (req, res) => {
    let address = await Address.findOne({ userId:req.body.userId });
    if (address) {
        Address.updateMany({ userId: req.body.userId }, {
            $set: {

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                appartment: req.body.appartment,
                city: req.body.city,
                country: req.body.country,
                state: req.body.state,
                pin: req.body.pin,
                phone: req.body.phone,
                email: req.body.email,
                userId: req.body.userId,
            }
        }
            ,
            (err, user) => {
                if (err) {
                    return res.status(500).send({ err: err });
                }
                return res.status(200).send(user);
            }
        );
    }
    else {
        Address.insertMany(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                appartment: req.body.appartment,
                city: req.body.city,
                country: req.body.country,
                state: req.body.state,
                pin: req.body.pin,
                phone: req.body.phone,
                email: req.body.email,
                userId: req.body.userId,
            },
            (err, user) => {
                if (err) {
                    return res.status(500).send({ err: err });
                }
                return res.status(200).send(user);
            }
        );
    }
});
//get address--------------------------------------------------------------------------------------------------------------
router.get("/address/:userId", (req, res) => {
    Address.find({ userId: req.params.userId }, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
    console.log(req.params.userId);
});
module.exports = router;
