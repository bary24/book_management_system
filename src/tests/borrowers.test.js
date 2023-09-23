const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js"); // Import your Express app

const { expect } = chai;
chai.use(chaiHttp);
beforeEach(async () => {
    // Connect to your PostgreSQL database
    require("../server");

    // Start your Express server (if needed)
    // For example, if you use app.listen(), you can start the server here
    // You may need to customize this part based on your server setup
    // app.listen(3000); // Replace with your server setup code
});
describe("apiBooks.create", () => {
    it("should create a new borrower", (done) => {
        console.log("TEST ");
        const newBorrower = {
            name: "test",
            email: "test222@gmail.com",
            password: "12345",
        };

        chai.request(app)
            .post("/borrowers")
            .send(newBorrower)
            .then((res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("email", newBorrower.email);
                console.log("Received the response:", res.body);
                done();
            })
            .catch((err) => {
                console.error("Error:", err);
                done(err);
            });
        // Add more test cases as needed
    });
});
