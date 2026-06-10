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

describe('Casos de prueba de APIs - Módulo Libros | Fabrizio Olivera', () => {

    it.only('API | Obtener detalle de un libro existente por ID | Fabrizio Olivera', () => {

        cy.loginRequest(user.username, user.password).then((token) => {
            const bookId = 2;

            cy.getBookByIdAPI(bookId, token).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('bookId', bookId);
                expect(response.body).to.have.property('title');
                expect(response.body).to.have.property('author');
            });
        });

    });

    it.only('API | Validar código de error al consultar un libro inexistente | Fabrizio Olivera', () => {

        cy.loginRequest(user.username, user.password).then((token) => {
            const bookIdInexistente = 1;

            cy.getBookByIdAPI(bookIdInexistente, token).then((response) => {
                expect(response.status).to.eq(404);
            });
        });

    });

});