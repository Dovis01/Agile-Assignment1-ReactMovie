// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const filterByTitle = (movieList, string) =>
    movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);
export const filterByGenre = (movieList, genreId) =>
    movieList.filter((m) => m.genre_ids.includes(genreId));
export const filterByYear = (movieList, releaseYear) =>
    movieList.filter(m => m.release_date.substring(0, 4).includes(releaseYear))
export const checkSorting = (selector, order) => {
    let values = [];
    cy.get('.MuiCardContent-root').find(selector).each(($elem) => {
        const numericValue = parseFloat($elem.text().trim());
        values.push(numericValue);
    }).then(() => {
        let isSorted = order === 'asc'
            ? values.slice(1).every((val, i) => val >= values[i])
            : values.slice(1).every((val, i) => val <= values[i]);

        console.log('Is sorted:', isSorted);
        expect(isSorted).to.be.true;
    });
};