const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
    console.log(req.body);

    const { username, password, repeatPassword } = req.body;

    if (username === "" || password === "" || repeatPassword === "") {
        return res.status(400).send({ message: "Please enter all fields" });
    }
    if (password !== repeatPassword) {
        return res.status(400).send({ message: "Please enter the same password" });
    }

    const saltRounds = 10;

    try { 
        const salt = await bcrypt.genSalt(saltRounds); // generate hash
        const hashedPassword = await bcrypt.hash(password, salt); // hash password
        await User.create({
            username, 
            password: hashedPassword
        });
    }
    catch(e) {
        console.log(e);
        if (e.code === 11000) { // account already exists
            return res.status(400).send({ message: "An account with this username already exists!" });
        }
        throw e;
    }

    res.send({ message: 'Signup successfully' });
});

router.post("/login", async (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    if (username === "" || password === "") {
        return res.status(400).send({ message: "Please enter all fields" });
    }    

    let user;
    try {
        user = await User.findOne({ username }).exec();
    }
    catch(e) {
        throw e;
    }

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send({ message: "Wrong username/password" });
    }

    const payload = {
        username
    }
    const token = jwt.sign(payload, "todoList", { expiresIn: "1h" }); // generate JsonWebToken, expire after 1 hour

    res.send({ message: 'Login successfully', token });
});

module.exports = router;