const { Card } = require("../models/cards");
const joi = require("joi");
const path = require("path");
const fs = require("fs");

module.exports = {
  getCards: async function (req, res, next) {
    try {
      const result = await Card.find().sort({ name: 1 }).limit(20); // 1 = ascending
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("error getting cards");
    }
  },

  findCard: async function (req, res, next) {
    try {
      const scheme = joi.object({
        id: joi.string().required(),
      });

      const { error, value } = scheme.validate(req.params);
      if (error) {
        console.log(error.details[0].message);
        res.status(400).send("invalid id");
        return;
      }

      const result = await Card.findOne({ _id: value.id });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("error getting card");
    }
  },

  updateCard: async function (req, res, next) {
    try {
      const scheme = joi.object({
        id: joi.string().required(),
        name: joi.string().min(4),
        description: joi.string(),
        price: joi.number().min(1),
      });

      const { error, value } = scheme.validate({
        ...req.body,
        id: req.params.id,
      });
      if (error) {
        console.log(error.details[0].message);
        res.status(400).send("invalid data");
        return;
      }

      const result = await Card.findOneAndUpdate({ _id: value.id }, req.body);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("error getting card");
    }
  },

  sortCards: async function (req, res, next) {
    try {
      const scheme = joi.object({
        dir: joi.number().required().valid(1, -1).default(1),
      });

      const { error, value } = scheme.validate(req.params);
      if (error) {
        console.log(error.details[0].message);
        res.status(400).send("invalid direction");
        return;
      }

      const result = await Card.find()
        .sort({ name: +value.dir })
        .limit(20);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("error sorting card");
    }
  },

  exportToFile: async function (req, res, next) {
    try {
      const scheme = joi.object({
        category: joi.string().required(),
      });

      const { error, value } = scheme.validate(req.query);
      if (error) {
        console.log(error.details[0].message);
        res.status(400).send("invalid category");
        return;
      }

      const query =
        value.category === "all" ? {} : { category: value.category };

      const result = await Card.find(query).sort({ name: 1 });

      const now = new Date().getTime();
      const fileName = `menu-${value.category}-${now}.txt`;
      // todo: check if exports folder exists, if not create it using 'fs'
      const filePath = path.join(__dirname, "../exports", fileName);
      const stream = fs.createWriteStream(filePath);

      stream.on("open", function () {
        stream.write(JSON.stringify(result));
        stream.end();
      });

      stream.on("finish", function () {
        res.json({ name: fileName });
      });
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
  },
};
