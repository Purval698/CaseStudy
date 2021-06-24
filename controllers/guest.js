const Guest = require("../models/guest.js");

const getGuest = (req, res) => {
  Guest.find()
    .then((guestList) => {
      res.status(200).json({ status: "success", data: guestList });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const getGuestById = (req, res) => {
  Guest.findById(req.params.id)
    .then((guest) => {
      if (guest) {
        res.status(200).json({ status: "success", data: guest });
      } else {
        res.status(404).json({ status: "error", message: "No guest found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const postGuest = (req, res) => {
  var newGuest = {
    fullName: req.body.fullName,
    roomNum:req.body.roomNum,
    roomType: req.body.roomType,
    address: req.body.address,
    mobileNum: req.body.mobileNum,
    age: req.body.age,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    bill:req.body.bill
  };

  var guest = new Guest(newGuest);
  guest
    .save()
    .then(() => {
      res.status(200).json({ status: "success", message: "New Guest Added" });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const deleteGuest = (req, res) => {
  Guest.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).json({status: "success", message:"Guest Name has been removed"});
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const putGuest = (req, res) => {
  Guest.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.status(200).json({status: "success", message:"Guest name has been updated"});
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

module.exports = { getGuest, getGuestById, postGuest, deleteGuest, putGuest };
