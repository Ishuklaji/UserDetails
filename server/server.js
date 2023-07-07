const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");

require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send({
        message: "API is working Now"
    });
});

app.listen(port, async () => {
    try {
        await connection;
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }

    console.log(`Server is running on http://localhost:${port}`);
});
