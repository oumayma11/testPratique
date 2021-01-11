const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const task = require("./controller/taskController");
app.use("/task", task);

/*app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})*/
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening at : http://localhost:${PORT} `);
    });
})

