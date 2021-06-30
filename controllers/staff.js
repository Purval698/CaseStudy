const Staff = require("../models/staff");

const getStaff = (req, res) => {
  
  Staff.find()
    .then((data) => {
      res.json({ status: "success", data });
    })
    .catch((err) => {
      res.send(404).json({ status: "error", message: err.message });
    });
};

const getStaffById = (req, res) => {
  
  Staff.findById(req.params.id)
    .then((data) => {
      res.status(200).json({ status: "success", data });
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const postStaff = (req, res) => {
  var newstaff = {
    staffName: req.body.staffName,
    email: req.body.email,
    age: req.body.age,
    contactNum: req.body.contactNum,
    address: req.body.address
  };

  Staff.create(newstaff)
    .then((data) => {
      res
        .status(200)
        .json({ status: "success", message: "Successfully added", data });
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
        message: "staff details has been updated"
      });
    })
    .catch((err) => {
      res.status(400).json({ status: "error", message: err.message });
    });
};

const deleteStaffById = (req, res) => {
  Staff.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "staff details has been deleted",
        data,
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
