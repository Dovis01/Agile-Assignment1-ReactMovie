// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('testListPage', (pageTitle, content) => {
    cy.get("h3").contains(pageTitle);
    cy.get(".MuiCardHeader-root").should("have.length", 20);
    cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(content[index].title);
    });
});


Cypress.Commands.add('testListPageByPage', (pageTitle, page) => {
    let movies;
    // Get movies data from API
    cy.request(`https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=${page}`)
        .its("body")
        .then((response) => {
            movies = response.results;
            // Proceed with the tests after movies data is fetched
            cy.get("h3").contains(pageTitle);
            cy.get(".MuiCardHeader-root").should("have.length", 20);
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(movies[index].title);
            });
        });
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
Cypress.Commands.add('assertCheckCardNumberLength', { prevSubject: 'optional' }, (subject, expectedLength) => {
    if (subject) {
        cy.wrap(subject).should("have.length", expectedLength);
    } else {
        cy.get(".MuiCardHeader-content").should("have.length", expectedLength);
    }
});


// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })