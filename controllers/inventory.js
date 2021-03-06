const Inventory = require("../models/inventory");

const getInventory = (req, res) => {
  Inventory.find()
    .then((inventoryList) => {
      res.status(200).json({ status: "success", data: inventoryList });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const getInventoryById = (req, res) => {
  Inventory.findById(req.params.id)
    .then((inventory) => {
      if (inventory) {
        res.status(200).json({ status: "success", data: inventory });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const postInventory = (req, res) => {
  var newInventory = {
    roomNum: req.body.roomNum,
    inventoryName: req.body.inventoryName,
    quantity: req.body.quantity,
  };

  var inventory = new Inventory(newInventory);
  inventory
    .save()
    .then((data) => {
      res.status(201).json({ status: "success", message: "New inventory added", data });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const putInventory = (req, res) => {
  Inventory.findByIdAndUpdate(req.params.id, req.body)
    .then(() =>  {
      res.status(200).json({
        status: "success",
        message: "Inventorydetails has been updated"
      });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const deleteInventory = (req, res) => {
  Inventory.findByIdAndDelete({ _id: req.params.id })
  .then((data) => {
    res.status(200).json({
      status: "success",
      message: "Inventory has been removed",
      data,
    });
  })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

module.exports = {
  getInventory,
  getInventoryById,
  postInventory,
  putInventory,
  deleteInventory,
};
