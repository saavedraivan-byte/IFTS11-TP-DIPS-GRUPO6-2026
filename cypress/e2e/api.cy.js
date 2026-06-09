import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {

    it.only('API | Comprar carrito exitosamente', () => {
        cy.loginRequest(user.username, user.password)
            .then((token) => {
                cy.postPurchaseAPI(user.userID, token).then((reponse) => {
            expect(reponse.status).to.eq(200)
            })
        })
    })
    it.only('API | Error al comprar carrito sin token', () => {
        cy.loginRequest(user.username, user.password)
            .then((token) => {
                cy.postPurchaseAPI(user.userID, '').then((reponse) => {
            expect(reponse.status).to.eq(401)
            })
        })
    })



    

    it.only('API | Eliminar libro/s en wishlist exitosamente | Saavedra Iván', () => {
        cy.loginRequest(user.username, user.password)
            .then((token) => {
                cy.postDeleteWishlistAPI(user.userID, token).then((reponse) => {
            expect(reponse.status).to.eq(200)
            })
        })   
    })

    it.only('API | Error al eliminar libro/s de wishlist sin token | Saavedra Iván', () => {
        cy.loginRequest(user.username, user.password)
            .then((token) => {
                cy.postDeleteWishlistAPI(user.userID, "").then((reponse) => {
            expect(reponse.status).to.eq(401)
            })
        })
    })


})