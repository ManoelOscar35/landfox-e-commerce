const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

require("dotenv/config");
const url = process.env.URL;

//Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.options('*', cors());

const itemRouter = require("./routers/itemRoutes");
app.use(url+'/items', itemRouter);

const categoryRouter = require("./routers/categoryRoutes");
app.use(url+'/category', categoryRouter);

const userRouter = require("./routers/userRoutes");
app.use(url+'/users', userRouter);

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    ).then(() => {
        console.log("Connection to database successful");
    })
    .catch((err) => {
        console.log("Connection to database failed ERROR: "+err);
    });

app.listen(3000, () => {
    console.log("Server's running on the port 3000!");
});