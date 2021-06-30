
constchai = require('chai');
constchaiHttp = require('chai-http');
constserver=require("../routes/manager");
let server = "http://localhost:2001"

 
chai.should(); 

chai.use(chaiHttp);

describe('Get /Manager/Staff',()=>{​​​​​​​​
it('it should get all data',(done)=>{​​​​​​​​
chai.request(server)
        .get('/Manager/Staff')
        .end((err,response)=>{​​​​​​​​
response.should.have.status(200);
response.body.should.be.a('object');
// response.body.length.should.be.eq(3);
done();
        }​​​​​​​​)
    }​​​​​​​​);
it("It should NOT GET all the tasks", (done) => {​​​​​​​​
chai.request(server)
            .get("/Manager/Staffs")
            .end((err, response) => {​​​​​​​​
response.should.have.status(404);
done();
            }​​​​​​​​);
    }​​​​​​​​);
 
}​​​​​​​​);
describe("GET /Manager/Staff/:id", () => {​​​​​​​​
it("It should GET a task by ID", (done) => {​​​​​​​​
consttaskId = "60cbb031a52dd6251013d814";
chai.request(server)                
            .get("/Manager/Staff/" + taskId)
            .end((err, response) => {​​​​​​​​
response.should.have.status(200);
response.body.should.be.a('object');
response.body.should.have.property('_id');
response.body.should.have.property('mode');
done();
            }​​​​​​​​);
    }​​​​​​​​),
it("It should NOT GET a task by ID", (done) => {​​​​​​​​
consttaskId = "12355984589748";
chai.request(server)                
            .get("/Manager/Staff/" + taskId)
            .end((err, response) => {​​​​​​​​
response.should.have.status(400);
done();
            }​​​​​​​​);
    }​​​​​​​​);
 
}​​​​​​​​);
describe("POST /Manager/Staff/", () => {​​​​​​​​
it("It should POST a new task", (done) => {​​​​​​​​
consttask = {​​​​​​​​
roomNumber: 50,
mode: "amit",
amount: 500,
date: "500",
time: "50"
        }​​​​​​​​;
chai.request(server)                
            .post("/Manager/Staff/")
            .send(task)
            .end((err, response) => {​​​​​​​​
response.should.have.status(200);
response.body.should.be.a('object');
// response.body.should.have.property('_id');
done();
            }​​​​​​​​);
    }​​​​​​​​);
 
it("It should NOT POST a new task without the name property", (done) => {​​​​​​​​
consttask = {​​​​​​​​
completed: false
        }​​​​​​​​;
chai.request(server)                
            .post("/Manager/Staff/")
            .send(task)
            .end((err, response) => {​​​​​​​​
response.should.have.status(404);
done();
            }​​​​​​​​);
    }​​​​​​​​);
}​​​​​​​​);

    

describe("PUT /Manager/Staff/:id", () => {​​​​​​​​
it("It should PUT an existing task", (done) => {​​​​​​​​
consttaskId = "60d85aa031ad441f5cadb066";
consttask = {​​​​​​​​
staffName:"hajdhjahdk",
email:"aghdgjhagjh@gmail.com",
age:"35",
contactNum:9898090909
        }​​​​​​​​;
chai.request(server)                
            .put("/Manager/Staff/" + taskId)
            .send(task)
            .end((err, response) => {​​​​​​​​
response.should.have.status(200);
response.body.should.be.a('object');
response.body.should.have.property('_id').eq("60d85aa031ad441f5cadb066");
// response.body.should.have.property('mode');
done();
            }​​​​​​​​);
    }​​​​​​​​);
 
it("It should NOT PUT", (done) => {​​​​​​​​
consttaskId = "60d246cb6809f2e7";
consttask = {​​​​​​​​
roomNumber: 50,
mode: "online",
amount: 500,
date: "500",
time: "50"
        }​​​​​​​​;
chai.request(server)                
            .put("/payment/update/" + taskId)
            .send(task)
            .end((err, response) => {​​​​​​​​
response.should.have.status(400);
done();
            }​​​​​​​​);
    }​​​​​​​​);        
}​​​​​​​​);


 
/**
 * Test the DELETE route
 */
describe("DELETE /Manager/Staff//:id", () => {​​​​​​​​
it("It should DELETE an existing task", (done) => {​​​​​​​​
consttaskId = "60d86c3e1be1a64474a15ce9";
chai.request(server)                
            .delete("/Manager/Staff/" + taskId)
            .end((err, response) => {​​​​​​​​
response.should.have.status(200);
done();
            }​​​​​​​​);
    }​​​​​​​​);
 
it("It should NOT DELETE a task that is not in the database", (done) => {​​​​​​​​
consttaskId = "12558521";
chai.request(server)                
            .delete("/Manager/Staff/" + taskId)
            .end((err, response) => {​​​​​​​​
response.should.have.status(404);
done();
            }​​​​​​​​);
    }​​​​​​​​);
 
}​​​​​​​​);



