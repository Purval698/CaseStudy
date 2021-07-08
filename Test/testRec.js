const chai = require("chai");
const chaiHttp = require("chai-http");
const server = "http://localhost:3000";
const chalk = require("chalk");

chai.should();
chai.use(chaiHttp);

let token = "";
let inventoryId = "";

describe("Post /Reception/Login", () => {
  it("it should login Reception", (done) => {
    const loginCredentials = {
      email: "Reception@gmail.com",
      password: "Reception@123",
    };

    chai
      .request(server)
      .post("/Reception/Login")
      .send(loginCredentials)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("message").eql("Successfully logged");
        done();
      });
  });
});

describe("Get /Reception/Guest", () => {
  it("it should get all data", (done) => {
    chai
      .request(server)
      .get("/Reception/Guest")
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

describe("post /Reception/Guest", () => {
  it("it should post data", (done) => {
    const guestData = {
      fullName: "Dummy2",
      roomNum: "302",
      roomType: "King",
      address: "Colony",
      mobileNum: "9090909090",
      age: "34",
      arrivalDate: "09/06/2021",
      departureDate: "11/06/2021",
      bill: 2500,
    };

    chai
      .request(server)
      .post("/Reception/Guest")
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .send(guestData)
      .end((err, res) => {
        inventoryId = res.body.data._id;
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("message").eql("New Guest Added");
        res.body.data.should.have.property("fullName").eql(guestData.fullName);
        done();
      });
  });
});

describe("/Reception/Guest/:id", () => {
  it("it should UPDATE aGuest given the id", (done) => {
    const demo = {
      fullName: "Abir Dummy",
    };
    chai
      .request(server)
      .put("/Reception/Guest/" + inventoryId)
      .set("Cookie", "token=" + token + ";")
      .send(demo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have
          .property("message")
          .eql("Guest name has been updated");
        done();
      });
  });
});

describe("/Reception/Guest/:id staff", () => {
  it("it should DELETE a guest with given the id", (done) => {
    chai
      .request(server)
      .delete("/Reception/Guest/" + inventoryId)
      .set("Cookie", "token=" + token + "; Path=/; HttpOnly;")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have
          .property("message")
          .eql("Guest Name has been removed");
        done();
      });
  });
});
