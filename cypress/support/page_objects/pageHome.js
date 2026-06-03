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


}module.exports = new pageHome();