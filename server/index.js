// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");

// initialize app
const app = express();

// apply middlewares

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(express.static('build'));

// apply routers

app.use('/', todoRoute);
app.use('/', userRoute)

// establish connections
const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
