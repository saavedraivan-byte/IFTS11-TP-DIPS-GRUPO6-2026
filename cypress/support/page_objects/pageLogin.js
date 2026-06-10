class pageLogin {

typeUserName(username){
    cy.get('input[formcontrolname="username"]').type(username)
}
typeUserPassword(password){
    cy.get('input[formcontrolname="password"]').type(password)
}
clickButton(){
    cy.get('app-login button').contains('Login').click()
}
//

}module.exports = new pageLogin();