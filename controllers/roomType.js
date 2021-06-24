const roomType = require("../models/roomType");

const getRoom = (req, res) => {
  // console.log
  // res.send("succ")
  roomType.find()
    .then((roomType) => {
      res.json({ status: "success", roomType});
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const getRoomTypeById = (req, res) => {
    roomType.findById(req.params.id)
      .then((roomType) => {
        if (roomType) {
          res.status(200).json({ status: "success", data: roomType });
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.status(404).json({ status: "error", message: err.message });
      });
  };

  
const postRoomType = (req, res) => {
  var newRoom = {
    roomType:req.body.roomType,
    roomPrice:req.body.roomPrice,
    keySpec:req.body.keySpec
  };

  var room = new roomType(newRoom);
  room
    .save()
    .then(() => {
      console.log("New room added");
      res.send("room added successfully")
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const putRoom = (req, res) => {
  roomType.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.send("Room details has been updated");
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

const deleteRoom = (req, res) => {
  roomType.findByIdAndRemove({ _id: req.params.id })
    .then(() => {
      res.send("Room has been removed");
    })
    .catch((err) => {
      res.status(404).json({ status: "error", message: err.message });
    });
};

module.exports = {getRoom,getRoomTypeById,postRoomType,putRoom,deleteRoom};