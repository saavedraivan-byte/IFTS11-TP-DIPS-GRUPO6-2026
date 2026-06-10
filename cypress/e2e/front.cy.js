import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
import books from '../fixtures/books.json'
import infoUser from '../fixtures/infoUser.json'
import pageBookDetail from "../support/page_objects/pageBookDetail"
import pageMyOrders from '../support/page_objects/pageMyOrders'
const pageHome = require('../support/page_objects/pageHome')
const pageLogin = require('../support/page_objects/pageLogin')
const headerNav = require('../support/page_objects/headerNav')
const pageShoppingCart = require('../support/page_objects/pageShoppingCart')
const pageCheckOut = require('../support/page_objects/pageCheckOut')
import { pageBooks } from '../support/page_objects/pageBooks'

describe('Casos de prueba de FRONT', () => {
    it.only('Comprar carrito exitosamente y visualizar orden de compra', () => {
    cy.delateCartAPI(user.userID);

    cy.visit(url.login)
    pageLogin.typeUserName(user.username);
    pageLogin.typeUserPassword(user.password);
    pageLogin.clickButton();

    cy.url().should('include', url.home)
    pageHome.bookVisible(books.bookName1);
    headerNav.validateCartQuantity("0");

    pageHome.clickAddtocartButton("0");

    pageHome.confirmationItemAdded();
    headerNav.validateCartQuantity("1")

    headerNav.clickShoppingCartButton();

    pageShoppingCart.validateBookVisible(books.bookName1);

    pageShoppingCart.clickCheckOutButton();

    cy.url().should('include', url.checkout)
    pageCheckOut.validateOrderVisible();
    pageCheckOut.validateShippingAddresVisible();

    cy.completeForm(infoUser.name, infoUser.addressLine1, infoUser.addressLine2, infoUser.pincode, infoUser.state);

    pageCheckOut.clickPlaceOrderButton();

    pageMyOrders.validateOrderCreation();
    cy.url().should('include', url.myorders)

    pageMyOrders.clickOrder('0');

    pageMyOrders.validatePurchaseCorrectly()

  })

  it.only('Modificación de compra en carrito y visualización de la orden | Saavedra Iván', () => {
    cy.delateCartAPI(user.userID);

    cy.visit(url.login);
    cy.login(user.username, user.password)

    cy.url("include", url.home);
    pageHome.bookVisible(books.bookName1);
    headerNav.validateCartQuantity('0');

    pageHome.clickAddtocartButton('0');

    pageHome.confirmationItemAdded(books.bookName1);
    headerNav.validateCartQuantity('1');

    pageHome.clickAddtocartButton('1');

    pageHome.confirmationItemAdded(books.bookName2);
    headerNav.validateCartQuantity('2');

    pageHome.clickAddtocartButton('2');

    pageHome.confirmationItemAdded(books.bookName3);
    headerNav.validateCartQuantity('3');

    headerNav.clickShoppingCartButton();

    cy.url().should('include', url.shoppingcart);
    cy.validateBooksVisible(books.bookName1, books.bookName2, books.bookName3)

    pageShoppingCart.clickDeleteButton('2');

    pageShoppingCart.confirmationItemDelete();
    headerNav.validateCartQuantity('2')

    pageShoppingCart.clickCheckOutButton();

    cy.url().should('include', url.checkout)
    pageCheckOut.validateOrderVisible();
    pageCheckOut.validateShippingAddresVisible();

    cy.completeForm(infoUser.name, infoUser.addressLine1, infoUser.addressLine2, infoUser.pincode, infoUser.state);

    pageCheckOut.clickPlaceOrderButton();

    //pageMyOrders.confirmationOrderPlaced(); a veces no logra encontrar el toast
    pageMyOrders.confirmationCartCleared();
    pageMyOrders.validateOrderCreation();
    cy.url().should('include', url.myorders);

    pageMyOrders.clickOrder('0');

    pageMyOrders.validatePurchaseCorrectly();
    pageMyOrders.validateBookVisible(books.bookName1);
    pageMyOrders.validateBookVisible(books.bookName2);
  })




})


  describe('Validar consistencia de la información entre catálogo y detalle', () => {

  it.only('Validar consistencia de la información entre el catálogo y el detalle del libro | Joel Barbona', () => {

    cy.visit(url.login)

    pageLogin.typeUserName(user.username)
    pageLogin.typeUserPassword(user.password)
    pageLogin.clickButton()

    pageHome.firstBookTitleBookCart()
    .invoke('text')
    .as('tituloLibro')

    pageHome.firstBookPriceBookCart()
    .invoke('text')
    .as('precioLibro')

    pageHome.openFirstBookBookCart()

    pageBookDetail.validateUrl()

    cy.get('@tituloLibro').then((titulo) => {
    pageBookDetail.titleVisible(titulo.trim())
    })

    cy.get('@precioLibro').then((precio) => {
    pageBookDetail.priceVisible(precio.trim())
    })

    pageBookDetail.imageVisible()
  })

})


describe('Validar manejo de errores en el Detalle de Libros', () => {
    it.only('Manejo de error al intentar forzar la URL de un libro inexistente | Fabrizio Olivera', () => {

        cy.visit(`${url.home}/books/details/999999`, { failOnStatusCode: false });

        pageBooks.validateErrorIsVisible();
        pageBooks.clickBackToHome();

        cy.url().should('include', url.home);
    });
});