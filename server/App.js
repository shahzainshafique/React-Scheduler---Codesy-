const express = require("express");
const app = express();
const agendaRoutes = require("./routes/agenda.route");
const agendaCtrl = require("./controllers/agenda.controller");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compress = require("compression");
require("dotenv/config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const agendaModel = require("./models/agenda.model");

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
// enable CORS - Cross Origin Resource Sharing
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//routes
app.use("/api/agenda/create", async (req, res) => {
  try {
    const agenda = await agendaModel(req.body);
    return res.status(200).json(agenda);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//MongoDB Connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("😎 : Database is ready!");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("🚀 : Server started on port %s.", port);
});
