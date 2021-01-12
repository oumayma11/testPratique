const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = require("../models/Task");


//CRUD task
//get all tasks
router.get("/all", (req, res) => {

    db.Task.findAll().then(tasks => res.send(tasks));
});
//get task by id
router.get("/find/:id", (req, res) => {
    db.Task.findAll({
        where: {
            id: req.params.id
        }
    }).then(task => res.send(task));
});
//post task
router.post("/newTask", (req, res) => {


    db.Task.findOne({
        where: {
            title: req.body.title
        }
    })
        
        .then(task => {
            if (!task) {
                db.Task.create({
                    description: req.body.description,
                    title: req.body.title,
                })
                    .then(task => {
                        res.json({ status: task.title + 'added successfully!' })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'task is already exist!' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })


});
//delete task
router.delete("/delete/:id", (req, res) => {
    db.Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("task is deleted successfully"));
});
//update task
router.put("/update/:id", (req, res) => {
    db.Task.update({
        description: req.body.description,
        
    },
        {
            where: {
                id: req.params.id

            }

        }

    ).then(() => res.send("updated successfuly"));
});
router.put("/isDone/:id", (req, res) => {
    db.Task.update({
        isDone: true,

    },
        {
            where: {
                id: req.params.id

            }

        }

    ).then(() => res.send("updated successfuly"));
});
module.exports = router;