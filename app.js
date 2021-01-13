const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
const db = require("./models");
var cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const task = require("./controller/taskController");
app.use("/task", task);
const tag = require("./controller/tagController");
app.use("/tag", tag);

/*app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})*/
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening at : http://localhost:${PORT} `);
    });
})



