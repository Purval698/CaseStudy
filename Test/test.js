const chai = require("chai");
const chaiHttp = require("chai-http");
const chalk = require("chalk");

const server = "http://localhost:2001";

chai.should();
chai.use(chaiHttp);

let token = "";
let staffId = "";

describe("Post /Manager/Login", () => {
  it("it should login manager", (done) => {
    const loginCredentials = {
      email: "manager@gmail.com",
      password: "Manager@123",
    };

    chai
      .request(server)
      .post("/Manager/Login")
      .send(loginCredentials)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("message").eql("Welcome Manager");
        done();
      });
  });
});

describe("Get /Manager/Staff", () => {
  it("it should get all data", (done) => {
    chai
      .request(server)
      .get("/Manager/Staff")
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data").be.a("array");
        done();
      });
  });
});

describe("post /Manager/Staff", () => {
  it("it should post data", (done) => {
    const staffData = {
      staffName: "Batman",
      email: "abc@gmail.com",
      age: 23,
      contactNum: 824278361,
      address: "Gotham",
    };

    chai
      .request(server)
      .post("/Manager/Staff")
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .send(staffData)
      .end((err, res) => {
        staffId = res.body.data._id;
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("message").eql("Successfully added");
        res.body.data.should.have
          .property("staffName")
          .eql(staffData.staffName);
        done();
      });
  });
});

// put Staff
describe("/Manager/Staff/:id", () => {
  it("it should UPDATE a staff given the id", (done) => {
    const demo = {
      staffName: "Abir",
      age: 19,
    };
    chai
      .request(server)
      .put("/Manager/Staff/" + staffId)
      .set("Cookie", "token=" + token + ";")
      .send(demo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have
          .property("message")
          .eql("staff details has been updated");
        done();
      });
  });
});

describe("/Manager/Staff/:id staff", () => {
  it("it should DELETE a staff with given the id", (done) => {
    chai
      .request(server)
      .delete("/Manager/Staff/" + staffId)
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have
          .property("message")
          .eql("staff details has been deleted");
        done();
      });
  });
});

// // //// Inventory Testing

describe("Get /Manager/Inventory", () => {
  it("it should get all data", (done) => {
    chai
      .request(server)
      .get("/Manager/Inventory")
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data").be.a("array");
        done();
      });
  });
});

describe("post /Manager/Inventory", () => {
  it("it should post data", (done) => {
    const inventoryData = {
      roomNum: "102",
      inventoryName: "dummyInvnetory",
      quantity: 2,
    };

    chai
      .request(server)
      .post("/Manager/Inventory")
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .send(inventoryData)
      .end((err, res) => {
        inventoryId = res.body.data._id;
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("message").eql("New inventory added");
        res.body.data.should.have
          .property("inventoryName")
          .eql(inventoryData.inventoryName);
        done();
      });
  });
});

// // Put request
describe("/Manager/Inventory/:id", () => {
  it("it should UPDATE a staff given the id", (done) => {
    const demo = {
      inventoryName: "dummyInventory",
    };
    chai
      .request(server)
      .put("/Manager/Inventory/" + inventoryId)
      .set("Cookie", "token=" + token + ";")
      .send(demo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have
          .property("message")
          .eql("Inventorydetails has been updated");
        done();
      });
  });
});

describe("/Manager/Inventory/:id staff", () => {
  it("it should DELETE a Inventory with given the id", (done) => {
    chai
      .request(server)
      .delete("/Manager/Inventory/" + inventoryId)
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have
          .property("message")
          .eql("Inventory has been removed");
        done();
      });
  });
});
