const express = require('express');
const router = express.Router();
const Med_category = require('../../modal/categoryschema');


router.post('/procategory', (req, res) => {
    Med_category.insertMany({
        category: req.body.category
    }, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err })
        }
        return res.status(200).send(user);
    })
});
router.get('/procategory', (req, res) => {

    Med_category.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err })
        }
        return res.status(200).send(user);
    })

});
router.get('/procategory/:category', (req, res) => {
    Med_category.find({ category: req.params['category'] }, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err })
        }
        return res.status(200).send(user);
    })
});
router.delete('/procategory/:id', (req, res) => {
    Med_category.deleteOne({ _id: req.params.id },
        (err, user) => {
            if (err) {
                return res.status(500).send({ err: err })
            }
            return res.status(200).send(user);
        })
});
router.put('/procategory/:id', (req, res) => {
    Med_category.updateOne({ _id: req.params.id }, { $set: { category: req.body.category } },
        (err, user) => {
            if (err) {
                return res.status(500).send({ err: err })
            }
            return res.status(200).send(user);
        })
});

router.get('/items/:category', (req, res) => {
    Med_category.aggregate([{
        $lookup: {
            from: "med_datas",
            localField: "category",
            foreignField: "category",
            as: "items"
        }
    },
    { $match : {category:req.params.category } }],
        function (err, result) {
            if (err) {
              return res.status(404).send(err);
            }
            return res.status(200).send(result);
        })
    
})
module.exports = router;