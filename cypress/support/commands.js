import pageLogin from "../support/page_objects/pageLogin";
import pageCheckOut from "../support/page_objects/pageCheckOut"
import pageShoppingCart from "../support/page_objects/pageShoppingCart";

Cypress.Commands.add('login', (username, password) => {

    pageLogin.typeUserName(username);
    pageLogin.typeUserPassword(password);
    pageLogin.clickButton();

})




Cypress.Commands.add('completeForm', (name, addressLine1, addressLine2, pincode, state) => {

    pageCheckOut.typeUserName(name);
    pageCheckOut.typeUserAdressLine1(addressLine1);
    pageCheckOut.typeUserAdressLine2(addressLine2);
    pageCheckOut.typeUserPincode(pincode);
    pageCheckOut.typeUserState(state);

})




Cypress.Commands.add('delateCartAPI', (userID, token) => {

    cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/shoppingcart/${userID}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token ? `Bearer ${token}` : '',// probar en token de eliminar'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEVEUEUiLCJzdWIiOiJVc2VyIiwianRpIjoiNTM2MWY3OTctYjU4Mi00YzExLWE2NWYtMGJiNWNkYWFiMzg2IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsInVzZXJJZCI6IjEwMjEiLCJleHAiOjE3Nzk5OTI4MzIsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY0LyJ9.4BCd09s5WI9WJ3pKOkhuq1OemuxALbt-jKBg7XvIMxI',
            body: ''
        },
    }).then((reponse) => {
        expect(reponse.status).to.eq(200)
    })



})




Cypress.Commands.add('postPurchaseAPI', (userID, token) => {


    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userID}`,
        failOnStatusCode: false,  //Importante para que cypress no falle automaticamente ante un error 400 o 500
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token ? `Bearer ${token}` : ''
        },
        body: {
            "orderDetails": [
                {
                    "book": {
                        "bookId": 2,
                        "title": "Harry Potter and the Chamber of Secrets",
                        "author": "JKR",
                        "category": "Mystery",
                        "price": 236,
                        "coverFileName": "9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"
                    },
                    "quantity": 1
                }
            ],
            "cartTotal": 236
        }
    })

})




Cypress.Commands.add('validateBooksVisible', (bookName1, bookName2, bookName3) => {

    pageShoppingCart.validateBookVisible(bookName1);
    pageShoppingCart.validateBookVisible(bookName2);
    pageShoppingCart.validateBookVisible(bookName3);
})




Cypress.Commands.add('postDeleteWishlistAPI', (userID, token) => {
    cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/Wishlist/${userID}`,
        failOnStatusCode: false,  //Importante para que cypress no falle automaticamente ante un error 400 o 500
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token ? `Bearer ${token}` : ''
        },
        body: ""
    })

})



Cypress.Commands.add("loginRequest", (username, password) => {
    // Retornamos la petición para que Cypress sepa que debe esperar a que termine
    return cy.request({
        method: "POST",
        url: "https://app.bookdbqa.online/api/login",
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: {
            username,
            password
        }
    }).then((response) => {
        return response.body.token;
    })
})    

//

Cypress.Commands.add('getBookByIdAPI', (bookId, token) => {
    return cy.request({
        method: 'GET',
        url: `https://app.bookdbqa.online/api/book/${bookId}`,
        headers: {
            'Authorization': token ? `Bearer ${token}` : ''
        },
        failOnStatusCode: false
    });
});