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
  firstBookTitleBookCart() {
    return cy.get('app-book-card')
      .first()
      .find('.card-title strong')
  }

  firstBookPriceBookCart() {
    return cy.get('app-book-card')
      .first()
      .find('p')
      .first()
  }

  openFirstBookBookCart() {
    return cy.get('.card-title a')
      .first()
      .click()
  }
firstBookAuthorBookCart() {
  return cy.get('app-book-card')
    .first()
    .find('.card-text')
    .eq(0)
}

firstBookCategoryBookCart() {
  return cy.get('app-book-card')
    .first()
    .find('.card-text')
    .eq(1)
}

}module.exports = new pageHome();