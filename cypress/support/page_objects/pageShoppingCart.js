class pageShoppingCart {

validateBookVisible(bookName){
    cy.get('app-shoppingcart').contains(bookName).should('be.visible')
} 
clickCheckOutButton(){
    cy.get('button').contains('CheckOut').click()
} 
clickDeleteButton(posBook){
    cy.get('.mat-mdc-cell.mdc-data-table__cell.cdk-cell.cdk-column-action.mat-column-action button').eq(posBook).contains('delete').click()
} 
confirmationItemDelete(){
    cy.contains('Book removed from cart').should('be.visible')
} 


}module.exports = new pageShoppingCart()