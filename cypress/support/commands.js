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




Cypress.Commands.add('delateCartAPI', (userID) => {

    return cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/shoppingcart/${userID}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer ...'
        }
    })

})
Cypress.Commands.add('getBookByIdAPI', (id) => {
    return cy.request({
        method: 'GET',
        url: `https://app.bookdbqa.online/books/${id}`,
        failOnStatusCode: false
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