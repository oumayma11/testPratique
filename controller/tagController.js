const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = require("../models/Task");


//CRUD tag
//get all tag
router.get("/allTag", (req, res) => {

    db.tags.findAll().then(tags => res.send(tags));
});
//get tag by id
router.get("/find/:id", (req, res) => {
    db.tags.findAll({
        where: {
            id: req.params.id
        }
    }).then(tags => res.send(tags));
});

router.get("/findTag/:id", (req, res) => {
    db.tags.findOne({
        where: {
            TaskId: req.params.id
        }
    }).then(tags => res.send(tags));
});
//post tag
router.post("/newTag/:id", (req, res) => {


    db.tags.findOne({
        where: {
            tag: req.body.tag,
        }
    })

        .then(task => {
            if (!task) {
                db.tags.create({
                    tag: req.body.tag,
                    TaskId: req.params.id

                })
                    .then(tag => {
                        res.json({ status: tag.tag + 'added successfully!' })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'tag is already exist!' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })


});
//delete tag
router.delete("/deleteTag/:id", (req, res) => {
    db.tags.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("tag is deleted successfully"));
});

module.exports = router;