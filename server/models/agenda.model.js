const mongoose = require("mongoose");
const AgendaSchema = new mongoose.Schema({
  reason: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});
module.exports = mongoose.model("Agenda", AgendaSchema);
