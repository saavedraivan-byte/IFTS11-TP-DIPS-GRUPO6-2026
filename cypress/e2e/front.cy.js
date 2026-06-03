import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
import books from '../fixtures/books.json'
import infoUser from '../fixtures/infoUser.json'
import pageMyOrders from '../support/page_objects/pageMyOrders'
const pageHome = require('../support/page_objects/pageHome')
const pageLogin = require('../support/page_objects/pageLogin')
const headerNav = require('../support/page_objects/headerNav')
const pageShoppingCart = require('../support/page_objects/pageShoppingCart')
const pageCheckOut = require('../support/page_objects/pageCheckOut')

describe('Casos de prueba de FRONT', () => {
  it('Comprar carrito exitosamente y visualizar orden de compra', () => {
    //Precondición que pone al carrito en 0 en cada reinicio de prueba
    cy.delateCartAPI(user.userID);
    //Accion paso 1:
    cy.visit(url.login)
    pageLogin.typeUserName(user.username);
    pageLogin.typeUserPassword(user.password);
    pageLogin.clickButton();
    //Respuesta sistema paso 1:
    cy.url().should('include', url.home)
    pageHome.bookVisible(books.bookName1);
    headerNav.validateCartQuantity("0");
    //Accion paso 2:
    pageHome.clickAddtocartButton();
    //Respuesta sistema paso 2:
    pageHome.confirmationItemAdded();
    headerNav.validateCartQuantity("1")
    //Accion paso 3:
    headerNav.clickShoppingCartButton();
    //Respuesta sistema paso 3:
    pageShoppingCart.validateBookVisible(books.bookName1);
    //Accion paso 4:
    pageShoppingCart.clickCheckOutButton();
    //Respuesta sistema paso 4:
    cy.url().should('include', url.checkout)
    pageCheckOut.validateOrderVisible();
    pageCheckOut.validateShippingAddresVisible();
    //Accion paso 5:
    cy.completeForm(infoUser.name, infoUser.addressLine1, infoUser.addressLine2, infoUser.pincode, infoUser.state);
    //Accion paso 6:
    pageCheckOut.clickPlaceOrderButton();
    //Respuesta sistema paso 6:
    pageMyOrders.validateOrderCreation();
    cy.url().should('include', url.myorders)
    //Accion paso 7:
    pageMyOrders.clickOrder('0');
    //Respuesta sistema paso 7:
    pageMyOrders.validatePurchaseCorrectly()


  })
  it.only('Modificación en carrito de compra y visualización de la orden | Saavedra Iván', () => {
    cy.delateCartAPI(user.userID);
    //1
    cy.visit(url.login);
    cy.login(user.username, user.password)
    // res 1
    cy.url("include", url.home);
    pageHome.bookVisible(books.bookName1);
    headerNav.validateCartQuantity('0');
    //2
    pageHome.clickAddtocartButton('0');
    //res 2
    pageHome.confirmationItemAdded(books.bookName1);
    headerNav.validateCartQuantity('1');
    //3
    pageHome.clickAddtocartButton('1');
    //res 3
    pageHome.confirmationItemAdded(books.bookName2);
    headerNav.validateCartQuantity('2');
    //4
    pageHome.clickAddtocartButton('2');
    //res 4
    pageHome.confirmationItemAdded(books.bookName3);
    headerNav.validateCartQuantity('3');
    //5
    headerNav.clickShoppingCartButton();
    //res 5
    cy.url().should('include', url.shoppingcart);
    cy.validateBooksVisible(books.bookName1, books.bookName2, books.bookName3)
    //6
    pageShoppingCart.clickDeleteButton('2');
    //res 6
    pageShoppingCart.confirmationItemDelete();
    headerNav.validateCartQuantity('2')
    //7
    pageShoppingCart.clickCheckOutButton();
    //res 7
    cy.url().should('include', url.checkout)
    pageCheckOut.validateOrderVisible();
    pageCheckOut.validateShippingAddresVisible();
    //8
    cy.completeForm(infoUser.name, infoUser.addressLine1, infoUser.addressLine2, infoUser.pincode, infoUser.state);
    //9
    pageCheckOut.clickPlaceOrderButton();
    //res 9
    pageMyOrders.confirmationOrderPlaced();
    pageMyOrders.confirmationCartCleared();
    pageMyOrders.validateOrderCreation();
    cy.url().should('include', url.myorders);
    //10
    pageMyOrders.clickOrder('0');
    //res 10
    pageMyOrders.validatePurchaseCorrectly();
    pageMyOrders.validateBookVisible(books.bookName1)
    pageMyOrders.validateBookVisible(books.bookName2)
  })
 
  

})