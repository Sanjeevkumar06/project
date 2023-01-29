const express = require("express");
const app = express();
let cors = require('cors');
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to student Management System." });
});

require("./app/routes/studentroute")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});