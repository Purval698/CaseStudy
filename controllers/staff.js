const Staff = require("../models/staff");

const getStaff = (req, res) => {
  Staff.find()
    .then((staffList) => {
      res.json({ status: "success", staffList });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const getStaffById = (req, res) => {
  Staff.findById(req.params.id)
    .then((staff) => 
    {
      if (staff.length) {
        res.status(200).json({ status: "success", staff });
      } else {
        res
          .status(200)
          .json({ status: "success", staff });
      }
    })
    .catch((err) => {
      if (err) {
        res.status(404).json({ status: "error", message: err.message });
      }
    });
};

const postStaff = (req, res) => {
  var newstaff = {
    staffName: req.body.staffName,
    email: req.body.email,
    age: req.body.age,
    contactNum: req.body.contactNum,
  };

  Staff.create(newstaff)
    .then((data) => {
      res
        .status(200)
        .json({ status: "success", message: "Successfully added" });
    })
    .catch((err) => {
      res.status(409).json({ status: "error", message: err.message });
    });
};

const putStaffById = (req, res) => {
  Staff.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "staff details has been updated",
      });
    })
    .catch((err) => {
      res.status(400).json({ status: "error", message: err.message });
    });
};

const deleteStaffById = (req, res) => {
  Staff.findByIdAndDelete({ _id: req.params.id })
    .then((_data) => {
      res.status(200).json({
        status: "success",
        message: "staff details has been deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

module.exports = {
  getStaff,
  getStaffById,
  postStaff,
  putStaffById,
  deleteStaffById,
};
