const express = require("express");
const agendaCtrl = require("../controllers/agenda.controller");
const router = express.Router();

router.route("/api/agenda/create").post(() => agendaCtrl.create);

module.exports = router;
