class headerNav {

validateCartQuantity(quantity){
    cy.get('#mat-badge-content-0').contains(quantity).should('be.visible')
}    
clickShoppingCartButton(){
    cy.get('mat-toolbar button').contains('shopping_cart').click()
} 
//


}module.exports = new headerNav()