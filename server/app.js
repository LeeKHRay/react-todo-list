const express = require("express");
const app = express();

require('./config/db_connection'); // connect to MongoDB

// const cors = require("cors");
// app.use(cors({ origin: 'http://localhost:3000' })) // allow cross-origin resource sharing(cors) only for localhost:3000

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));

app.listen(3001);
