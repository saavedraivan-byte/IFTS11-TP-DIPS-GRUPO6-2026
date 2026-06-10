class pageHome {

bookVisible(bookName){
    cy.get('app-book-card').contains(bookName).should('be.visible')
}
clickAddtocartButton(posBook){
    cy.get('app-book-card').eq(posBook).contains('Add to Cart').click()
}
confirmationItemAdded(){
    cy.contains('One Item added to cart').should('be.visible')
}
//
firstBookTitle() {
        return cy.get('.book-title').first()
}

firstBookAuthor() {
        return cy.get('.book-author').first()
}

firstBookPrice() {
        return cy.get('.book-price').first()
}

openFirstBook() {
        cy.contains('View Details').first().click()
}

}module.exports = new pageHome();