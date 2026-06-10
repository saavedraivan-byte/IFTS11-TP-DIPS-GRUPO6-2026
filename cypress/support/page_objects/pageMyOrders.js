class pageMyOrders {

validateOrderCreation(){
    cy.get('.mdc-data-table__content.ng-star-inserted').should('be.visible')
}
clickOrder(posOrder){
    cy.get('.mdc-data-table__content.ng-star-inserted tr').eq(posOrder).click()
}
validatePurchaseCorrectly(){
    cy.get('.mat-mdc-row.mdc-data-table__row.cdk-row.example-detail-row.ng-tns-c151581814-0.ng-star-inserted').should('be.visible')
}
confirmationOrderPlaced(){
    cy.contains('Order placed successfully').should('be.visible')
}
confirmationCartCleared(){
    cy.contains('Cart cleared').should('be.visible')
}
validateBookVisible(bookName){
    cy.contains(bookName).should('be.visible')
}
//

}module.exports = new pageMyOrders()