var express = require("express");
var app = express();
var logger = require("morgan");
require("dotenv").config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));
app.use(logger("dev"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  let curTime = new Date(Date.now());

  res.json({
    unix: curTime.getTime(),
    utc: curTime.toUTCString(),
  });
});

app.get("/api/:date", (req, res, next) => {
  let inputDate = req.params.date;
  if (!isNaN(parseInt(req.params.date))) {
    inputDate = parseInt(req.params.date);
  }

  let dateParam = new Date(inputDate);
  console.log(typeof req.params.date);

  console.log(dateParam.toUTCString());

  if (dateParam.toUTCString() === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: dateParam.getTime(),
      utc: dateParam.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
