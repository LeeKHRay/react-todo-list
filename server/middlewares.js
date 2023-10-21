const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || "";

    try {
        req.payload = jwt.verify(token, "todoList");
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ error: "Unauthorized" });
    }

    next();
};

module.exports = { authentication };