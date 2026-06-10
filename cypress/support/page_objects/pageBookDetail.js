class PageBookDetail {

  titleVisible(title) {
    cy.contains(title)
      .should('be.visible')
  }

  authorVisible(author) {
    cy.contains(author)
      .should('be.visible')
  }

  categoryVisible(category) {
    cy.contains(category)
      .should('be.visible')
  }

  priceVisible(price) {
    cy.contains(price)
      .should('be.visible')
  }

  imageVisible() {
    cy.get('img')
      .should('be.visible')
  }

  validateUrl() {
    cy.url()
      .should('include', '/books/details')
  }
}

module.exports = new PageBookDetail()