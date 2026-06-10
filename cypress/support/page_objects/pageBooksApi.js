class pageBooksApi {
  getBook(id) {
    return cy.getBookApi(id)
  }
}

export default new pageBooksApi()