// const Room = require("../models/availableRoom");

// const getRoom = (req, res) => {
//   Room.find()
//     .then((room) => {
//       res.status(200).json({ status: "success", data: room });
//     })
//     .catch((err) => {
//       res.status(404).json({ status: "error", message: err.message });
//     });
// };

// const getRoomById = (req, res) => {
//   console.log(req.params.id);
//   Room.findById(req.params.id)
//     .then((room) => {
//       if (room) {
//         res.status(200).json({ status: "success", data: room });
//       } else {
//         res.status(404).json({ status: "error", message: "No room found" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).json({ status: "error", message: err.message });
//     });
// };



// module.exports = { getRoom, getRoomById };
