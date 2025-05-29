let userOpsURL = 'v2/user/';
let usrName;

export class userOperations {

    // Create a new user by sending POST request and validate response
    static createUser(usrOps) {
        cy.postRequest(userOpsURL, usrOps).then((res) => {
            usrName = usrOps.username;  // Save username for later use

            // Validate response body after user creation
            cy.wrap(res.body).should((body) => {
                expect(body.code).to.eq(usrOps.id);
                expect(body.type).to.eq('unknown');
                expect(body.message).to.eq('200');
            });
        });

        // Retrieve the created user details via GET request and validate all fields
        cy.getRequest(userOpsURL + usrName).then((res) => {
            cy.wrap(res.body).should((body) => {
                expect(body.id).to.eq(usrOps.id);
                expect(body.username).to.eq(usrOps.username);
                expect(body.firstName).to.eq(usrOps.firstName);
                expect(body.email).to.eq(usrOps.email);
                expect(body.password).to.eq(usrOps.password);
                expect(body.phone).to.eq(usrOps.phone);
                expect(body.userStatus).to.eq(usrOps.userStatus);
            });
        });
    }

    // Update an existing user by sending PUT request and validate the request and response
    static updateUsrOps(updateUserOps) {
        cy.updateRequest(userOpsURL + usrName, updateUserOps).then((res) => {
            // Validate the data sent in the PUT request body
            cy.wrap(res.allRequestResponses[0]).then((responseDetails) => {
                const parsedBody = JSON.parse(responseDetails['Request Body']);
                console.log(parsedBody);

                expect(parsedBody.id).to.eq(updateUserOps.id);
                expect(parsedBody.username).to.eq(updateUserOps.username);
                expect(parsedBody.firstName).to.eq(updateUserOps.firstName);
                expect(parsedBody.email).to.eq(updateUserOps.email);
                expect(parsedBody.password).to.eq(updateUserOps.password);
                expect(parsedBody.phone).to.eq(updateUserOps.phone);
                expect(parsedBody.userStatus).to.eq(updateUserOps.userStatus);
            });
        });

        // Retrieve updated user details and verify they reflect the update
        cy.getRequest(userOpsURL + usrName).then((res) => {
            cy.wrap(res.body).should((body) => {
                expect(body.id).to.eq(updateUserOps.id);
                expect(body.username).to.eq(updateUserOps.username);
                expect(body.firstName).to.eq(updateUserOps.firstName);
                expect(body.email).to.eq(updateUserOps.email);
                expect(body.password).to.eq(updateUserOps.password);
                expect(body.phone).to.eq(updateUserOps.phone);
                expect(body.userStatus).to.eq(updateUserOps.userStatus);
            });
        });
    }

    // Delete the existing user and validate the delete response
    static deleteUser(usrOps) {
        cy.deleteRequest(userOpsURL + usrName).then((res) => {
            expect(res.body.code).to.eq(usrOps.id);
            expect(res.body.type).to.eq('unknown');
            expect(res.body.message).to.eq(usrOps.username);
        });
    }
}
