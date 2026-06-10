class PageBooks {
    // 1. Definir los selectores (los elementos de la pantalla)
    elements = {
        errorMessage: () => cy.contains('No books found.'),
        backToHomeBtn: () => cy.get('button').contains('Back to Home')
    }

    // 2. Definir las acciones (lo que hacés con esos elementos)
    validateErrorIsVisible() {
        this.elements.errorMessage().should('be.visible');
    }

    clickBackToHome() {
        this.elements.backToHomeBtn().click();
    }
}

// Exportarlo para que lo hereden otros archivos
export const pageBooks = new PageBooks();