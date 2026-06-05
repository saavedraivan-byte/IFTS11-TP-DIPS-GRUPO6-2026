import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {

    it.only('API | Comprar carrito exitosamente', () => {
        cy.postPurchaseAPI(user.userID, user.token).then((reponse) => {
            expect(reponse.status).to.eq(200)
        })
    })
    it.only('API | Error al comprar carrito sin token', () => {
        cy.postPurchaseAPI(user.userID, '').then((reponse) => {
            expect(reponse.status).to.eq(401)
        })
    })


    it('Caso de prueba a hacer | Saavedra Iván', () => {

        
    })

})