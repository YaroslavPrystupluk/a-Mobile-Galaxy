const Filter = require("../models/Filter");
const Product = require("../models/Product");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

const group = {
  $group: {
    _id: null,
    minPrice: {
      $min: "$currentPrice",
    },
    maxPrice: {
      $max: "$currentPrice",
    },
    brand: {
      $addToSet: "$brand",
    },
    screenType: {
      $addToSet: "$screenType",
    },
    diagonal: {
      $addToSet: "$diagonal",
    },
    RAM: {
      $addToSet: "$RAM",
    },
    iternalStorage: {
      $addToSet: "$iternalStorage",
    },
    processor: {
      $addToSet: "$processor",
    },
    waterResistant: {
      $addToSet: "$waterResistant",
    },
  },
};
exports.addFilter = (req, res, next) => {
  Filter.findOne({ name: req.body.name, type: req.body.type }).then(
    (filter) => {
      if (filter) {
        return res.status(400).json({
          message: `Filter with type "${filter.type}" and name "${filter.name}" already exists`,
        });
      } else {
        const initialQuery = _.cloneDeep(req.body);
        const newFilter = new Filter(queryCreator(initialQuery));

        newFilter
          .save()
          .then((filter) => res.json(filter))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    }
  );
};

exports.updateFilter = (req, res, next) => {
  Filter.findOne({ _id: req.params.id })
    .then((filter) => {
      if (!filter) {
        return res.status(400).json({
          message: `Filter with _id "${req.params.id}" is not found.`,
        });
      } else {
        const initialQuery = _.cloneDeep(req.body);
        const updatedFilter = queryCreator(initialQuery);

        Filter.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedFilter },
          { new: true }
        )
          .then((filter) => res.json(filter))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteFilter = (req, res, next) => {
  Filter.findOne({ _id: req.params.id }).then(async (filter) => {
    if (!filter) {
      return res
        .status(400)
        .json({ message: `Filter with _id "${req.params.id}" is not found.` });
    } else {
      const filterToDelete = await Filter.findOne({ _id: req.params.id });

      Filter.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Filter witn type "${filterToDelete.type}" and name "${filterToDelete.name}" is successfully deletes from DB `,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.getFilters = (req, res, next) => {
  Filter.find()
    .then((filters) => res.json(filters))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getFiltersByType = (req, res, next) => {
  if (req.params.type == "agregate") {
    const query = [];
    const fieldQuery = Object.keys(req.query);
    if (fieldQuery.length) {
      const match = {};
      fieldQuery.forEach((field) => {
        switch (field) {
          case "brand":
          case "processor":
          case "waterResistant":
          case "iternalStorage":
          case "RAM":
          case "diagonal":
          case "screenType":
            match[field] = req.query[field];
            break;
          default:
            break;
        }
      });
      query.push({ $match: match });
    }

    query.push(group);

    Product.aggregate(query)
      .then((filters) => res.json(filters))
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        })
      );
  } else {
    Filter.find({ type: req.params.type })
      .then((filters) => res.json(filters))
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        })
      );
  }
};
