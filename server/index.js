const express = require("express");
const app = express();
require("./DB/ConnectDatabase");
const router = require("./Routers/Route");
const cors = require("cors");
const PORT = process.env.PORT || 4000;


app.get("/", (req, res) => {
          res.json("Server started json format");
});


app.use(express.json());
app.use(cors());
app.use(router);


app.listen(PORT, () => {
          console.log(`App is running on ${PORT}`);
})