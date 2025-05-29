let storeURL = 'v2/store/order/';
let getStoreURL = 'v2/store/inventory/';

export class storeOrders {

    // Places a new store order and validates request data and inventory status
    static createStoreOrder(storeOrder) {
        // Sends a POST request to create a new store order
        cy.postRequest(storeURL, storeOrder).then((res) => {
            cy.wrap(res.allRequestResponses[0]).then((responseDetails) => {
                // Parse the raw request body to validate sent data
                const parsedBody = JSON.parse(responseDetails['Request Body']);
                expect(parsedBody.id).to.eq(storeOrder.id);
                expect(parsedBody.petId).to.eq(storeOrder.petId);
                expect(parsedBody.quantity).to.eq(storeOrder.quantity);
                expect(parsedBody.shipDate).to.eq(storeOrder.shipDate);
                expect(parsedBody.status).to.eq(storeOrder.status);
                expect(parsedBody.complete).to.eq(storeOrder.complete);
            });
        });

        // Sends a GET request to check updated inventory counts
        cy.getRequest(getStoreURL).then((res) => {
            cy.wrap(res.body).should((body) => {
                expect(body.sold).to.be.a('number');
                expect(body.pending).to.be.a('number');
                expect(body.available).to.be.a('number');
            });
        });
    }
}
