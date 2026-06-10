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

    pageHome.clickAddtocartButton();

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

  it.only('Modificación en carrito de compra y visualización de la orden | Saavedra Iván', () => {
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

    pageMyOrders.confirmationOrderPlaced();
    pageMyOrders.confirmationCartCleared();
    pageMyOrders.validateOrderCreation();
    cy.url().should('include', url.myorders);

    pageMyOrders.clickOrder('0');

    pageMyOrders.validatePurchaseCorrectly();
    pageMyOrders.validateBookVisible(books.bookName1)
    pageMyOrders.validateBookVisible(books.bookName2)
  })




})
describe('Validar consistencia entre catálogo y detalle', () => {

  it.only('Validar consistencia de la información entre el catálogo y el detalle del libro | Joel Barbona', () => {

    // Login
    cy.login()

    // Capturar datos del primer libro
    cy.get('.book-card').first().within(() => {

      cy.get('.book-title')
        .invoke('text')
        .as('tituloLibro')

      cy.get('.book-author')
        .invoke('text')
        .as('autorLibro')

      cy.get('.book-price')
        .invoke('text')
        .as('precioLibro')

      cy.contains('View Details').click()

    })

    // Validar detalle

    cy.get('@tituloLibro').then((titulo) => {
      cy.get('.book-detail-title')
        .should('contain', titulo.trim())
    })

    cy.get('@autorLibro').then((autor) => {
      cy.get('.book-detail-author')
        .should('contain', autor.trim())
    })

    cy.get('@precioLibro').then((precio) => {
      cy.get('.book-detail-price')
        .should('contain', precio.trim())
    })

    // Validar portada

    cy.get('.book-detail-image')
      .should('be.visible')

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