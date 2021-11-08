const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require("cors");

env.config();

app.use(cors());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {console.log("connect to mongoDB")})
    .catch((err) => {console.log(err)});


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/list", listRoute);


app.listen(5000, () => {
    console.log("server is running");
});