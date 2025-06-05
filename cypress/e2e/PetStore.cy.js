/// <reference types="cypress" />

// Import Page Object Model (POM) classes for pet, store, and user operations
import { petStore } from "./POM/clsPetStore";
import { storeOrders } from "./POM/clsStoreInventory";
import { userOperations } from "./POM/clsUserOperations";

describe('CRUD tests for Petstore: Pet, Store Orders, and User Operations', () => {

    // Load test data fixtures before each test
    beforeEach('Load fixtures and prepare data', function () {
        cy.fixture('petStore').as('petStore');                 // Pet data for create
        cy.fixture('updatePetStore').as('updatePetStore');     // Pet data for update
        cy.fixture('storeOrder').then((storeOrderData) => {    // Store order data with dynamic ship date
            storeOrderData.shipDate = new Date().toISOString(); // Use current timestamp for shipDate
            this.storeOrder = storeOrderData;
        });
        cy.fixture('userOperations').as('usrOps');             // User data for create
        cy.fixture('updateUserOperations').as('updateUserOps');// User data for update
    });

    // Clear references to fixtures after each test to avoid stale data
    afterEach('Clear fixture references', function () {
        this.petStore = null;
        this.updatePetStore = null;
        this.storeOrder = null;
        this.usrOps = null;
        this.updateUserOps = null;
    });

    // --- Pet Store Tests ---

    it('Create a new pet and verify response', function () {
        petStore.addNewPet(this.petStore);  // Call function to POST pet data and validate
    });

    it('Update existing pet information and verify', function () {
        petStore.updatePet(this.updatePetStore); // Call function to PUT updated pet data and validate
    });

    it('Delete a pet and verify deletion', function () {
        petStore.deletePet(this.updatePetStore); // Call function to DELETE the pet and validate
    });

    // --- Store Orders Tests ---

    it('Create a new store order for a pet and validate', function () {
        storeOrders.createStoreOrder(this.storeOrder); // Call function to POST store order and validate
    });

    // --- User Operations Tests ---

    it('Create a new user and verify', function () {
        userOperations.createUser(this.usrOps); // Call function to POST user data and validate
        cy.log("dummy")
    });

    it('Update a user\'s details and verify changes', function () {
        userOperations.updateUsrOps(this.updateUserOps); // Call function to PUT updated user data and validate
    });

    it('Delete a user and verify deletion', function () {
        userOperations.deleteUser(this.usrOps); // Call function to DELETE the user and validate
    });

});
