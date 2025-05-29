let petURL = '/v2/pet/';
let petId;

export class petStore {
    
    // Creates a new pet and validates the response
    static addNewPet(petStoreData) {
        cy.postRequest(petURL, petStoreData).then((res) => {
            petId = res.body.id;
            cy.wrap(res.body).should((body) => {
                expect(body.id).to.eq(petStoreData.id);
                expect(body.name).to.eq(petStoreData.name);
                expect(body.photoUrls[0]).to.eq(petStoreData.photoUrls[0]);
                expect(body.status).to.eq(petStoreData.status);
            });
        });

        // Verifies the created pet via GET request
        cy.getRequest(`${petURL}${petId}`).then((res) => {
            cy.wrap(res.body).should((body) => {
                expect(body.id).to.eq(petStoreData.id);
                expect(body.name).to.eq(petStoreData.name);
                expect(body.photoUrls[0]).to.eq(petStoreData.photoUrls[0]);
                expect(body.status).to.eq(petStoreData.status);
            });
        });
    }

    // Updates an existing pet and validates the update
    static updatePet(updatePetStoreData) {
        cy.updateRequest(petURL, updatePetStoreData).then((res) => {
            petId = res.body.id;
            cy.wrap(res.body).should((body) => {
                expect(body.id).to.eq(updatePetStoreData.id);
                expect(body.name).to.eq(updatePetStoreData.name);
                expect(body.photoUrls[0]).to.eq(updatePetStoreData.photoUrls[0]);
                expect(body.status).to.eq(updatePetStoreData.status);
            });
        });

        // Verifies the updated pet via GET request
        cy.getRequest(`${petURL}${petId}`).then((res) => {
            cy.wrap(res.body).should((body) => {
                expect(body.id).to.eq(updatePetStoreData.id);
                expect(body.name).to.eq(updatePetStoreData.name);
                expect(body.photoUrls[0]).to.eq(updatePetStoreData.photoUrls[0]);
                expect(body.status).to.eq(updatePetStoreData.status);
            });
        });
    }

    // Deletes the pet and validates the deletion response
    static deletePet(updatePetStoreData) {
        cy.deleteRequest(`${petURL}${petId}`).then((res) => {
            cy.wrap(res.body).should((body) => {
                expect(Number(body.message)).to.eq(updatePetStoreData.id);
                expect(body.type).to.eq('unknown');
            });
        });
    }
}
