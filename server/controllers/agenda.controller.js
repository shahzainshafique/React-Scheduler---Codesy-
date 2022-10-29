const Agenda = require("../models/agenda.model");
const create = async (req, res) => {
  try {
    const agenda = await Agenda(req.body);
    return res.status(200).json(agenda);
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = create;
