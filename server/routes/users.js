const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post("/signup", async (req, res) => {
    console.log(req.body);

    const { username, password, repeatPassword } = req.body;

    if (username === "" || password === "" || repeatPassword === "") {
        return res.status(400).send({ message: "Please enter all field" });
    }
    if (password !== repeatPassword) {
        return res.status(400).send({ message: "Please enter the same password" });
    }

    try { 
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds); // generate hash
        const hashedPassword = await bcrypt.hash(password, salt); // hash password
        await User.create({
            username, 
            password: hashedPassword
        });
        res.send({ message: 'Signup successfully' });
    }
    catch(e) {
        console.log(e);
        if (e.code === 11000) { // account already exists
            return res.status(400).send({ message: "An account with this username already exists!" });
        }
        throw e;
    }
});

module.exports = router;