


const connectToMongo = require("./database.js");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/campaign", require("./routes/campaign"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});