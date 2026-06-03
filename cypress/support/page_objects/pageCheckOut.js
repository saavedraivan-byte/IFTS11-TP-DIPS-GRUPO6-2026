class pageCheckOut {


validateOrderVisible(){
    cy.get('app-checkout table').should('be.visible')
}


validateShippingAddresVisible(){
    cy.get('app-checkout form').should('be.visible')
}


typeUserName(){
    cy.get('input[formcontrolname="name"]').type('asd')
}
typeUserAdressLine1(){
    cy.get('input[formcontrolname="addressLine1"]').type('asd')
}
typeUserAdressLine2(){
    cy.get('input[formcontrolname="addressLine2"]').type('asd')
}
typeUserPincode(){
    cy.get('input[formcontrolname="pincode"]').type('123456')
}
typeUserState(){
    cy.get('input[formcontrolname="state"]').type('asd')
}


clickPlaceOrderButton(){
    cy.get('button').contains('Place Order').click()
}


}module.exports = new pageCheckOut()