// Custom Cypress command to send a POST request with JSON body
Cypress.Commands.add('postRequest', (postURL, postBody) => {
    cy.request({
        method: 'POST',
        url: postURL,
        body: postBody,
        headers: {
            'content-type': 'application/json'
        }
    }).should((res) => {
        checkStatus(res); // Verify response status code is successful
    });
});

// Custom Cypress command to send a GET request
Cypress.Commands.add('getRequest', (postURL) => {
    cy.request({
        method: 'GET',
        url: postURL
    }).should((res) => {
        checkStatus(res); // Verify response status code is successful
    });
});

// Custom Cypress command to send a PUT request with JSON body (for updates)
Cypress.Commands.add('updateRequest', (putURL, putBody) => {
    cy.request({
        method: 'PUT',
        url: putURL,
        body: putBody,
        headers: {
            'content-type': 'application/json'
        }
    }).should((res) => {
        checkStatus(res); // Verify response status code is successful
    });
});

// Custom Cypress command to send a DELETE request
Cypress.Commands.add('deleteRequest', (deleteURL) => {
    cy.request({
        method: 'DELETE',
        url: deleteURL
    }).should((res) => {
        checkStatus(res); // Verify response status code is successful
    });
});

// Helper function to check if the response status code indicates success (2xx)
// Throws an error with details if status is outside the success range
function checkStatus(response) {
    const status = response.status;
    if (status < 200 || status >= 300) {
        throw new Error(`❌ API call failed with status code ${status}. Response body: ${JSON.stringify(response.body)}`);
    }
    expect(status).to.be.within(200, 299); // Assert status code is in 2xx range
}
