const express = require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");

const userRouter = express.Router();

// Get all users
userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving users", error: error.message });
    }
});

// Register user
userRouter.post("/register", async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) return res.send({ message: "Something went wrong", status: 0 });
        try {
            let user = new UserModel({ name, email, password: hash, role, phoneNumber });
            await user.save();
            res.send({
                message: "User created",
                status: 1,
                userId: user._id
            });
        } catch (error) {
            res.send({
                message: error.message,
                status: 0,
            });
        }
    });
});

// Login user
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let option = {
        expiresIn: "50m"
    };

    try {
        let user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.send({
                message: "User does not exist",
                status: 0
            });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.send({ message: "Something went wrong: " + err, status: 0 });
            }

            if (result) {
                let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, option);
                res.send({
                    message: "User logged-in successfully",
                    token: token,
                    status: 1
                });
            } else {
                res.send({
                    message: "Incorrect Password",
                    status: 0
                });
            }
        });
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        });
    }
});

// Get user details
userRouter.get("/:id", authenticator, async (req, res) => {
    const { id } = req.params;


    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Allow superadmin to edit any user's details
        res.send(user)
    } catch (error) {
        res.status(500).send({ message: "Error retrieving user details", error: error.message });
    }
});

// Update user details
userRouter.put("/update/:id", authenticator, async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;
    console.log(name, email, phoneNumber);
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Only allow updating email, password, role, and phoneNumber if the user is a super admin

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        await user.save();

    } catch (error) {
        res.status(500).send({ message: "Error updating user details", error: error.message });
    }
});

module.exports = { userRouter };