import {filterByYear, checkSorting} from "../support/e2e";
let movies;

describe("New filtering and sorting", () => {
    before(() => {
        // Get movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=4`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
        cy.get('[aria-label="Go to page 4"]').click();
    });

    describe("New filtering feature", () => {

        it('should allow entering a correct year and have filter results', () => {
            const releaseYear = "2023";
            const matchingMovies = filterByYear(movies, releaseYear);
            cy.get('#release-year-search').clear().type(releaseYear);
            cy.assertCheckCardNumberLength(matchingMovies.length);
            cy.testAllCardHeaderContent(matchingMovies);
        });

        it('should have no matches due to invalid year input', () => {
            const releaseYear = "abcd";
            cy.get('#release-year-search').clear().type(releaseYear);
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });

        it('should not return results for a future year', () => {
            const releaseYear = "2100";
            cy.get('#release-year-search').clear().type(releaseYear);
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });

        it('should return results for a past year', () => {
            const releaseYear = "2021";
            const matchingMovies = filterByYear(movies, releaseYear);
            cy.get('#release-year-search').clear().type(releaseYear);
            cy.assertCheckCardNumberLength(matchingMovies.length);
            cy.testAllCardHeaderContent(matchingMovies);
        });
    });


    describe("New sorting feature", () => {

        it('should open the sort option dropdown and select an option successfully', () => {
            cy.get('#sort-option-select').click();
            cy.get('[data-value="popularity"]').click();
            cy.testAllCardHeaderContent(movies);
        });

        it('should open the sort order dropdown and select an option successfully', () => {
            cy.get('#sort-order-select').click();
            cy.get('[data-value="asc"]').click();
            cy.testAllCardHeaderContent(movies);
        });

        it('should not sort when the sort option dropdown is set to "None"', () => {
            cy.get('#sort-option-select').click();
            cy.get('[data-value="none"]').click();
            cy.get('#sort-order-select').click();
            cy.get('[data-value="asc"]').click();
            cy.testAllCardHeaderContent(movies);
        });

        it('should not sort when the sort order dropdown is set to "None"', () => {
            cy.get('#sort-option-select').click();
            cy.get('[data-value="popularity"]').click();
            cy.get('#sort-order-select').click();
            cy.get('[data-value="none"]').click();
            cy.testAllCardHeaderContent(movies);
        });

        describe('Sort the list successfully when valid sort and order options are selected', () => {

            it('should correctly sort movies by popularity in descending order', () => {
                cy.get('#sort-option-select').click();
                cy.get('[data-value="popularity"]').click();
                cy.get('#sort-order-select').click();
                cy.get('[data-value="desc"]').click();
                checkSorting('.css-ir5tdx', 'desc');
            });

            it('should correctly sort movies by popularity in ascending order', () => {
                cy.get('#sort-option-select').click();
                cy.get('[data-value="popularity"]').click();
                cy.get('#sort-order-select').click();
                cy.get('[data-value="asc"]').click();
                checkSorting('.css-ir5tdx', 'asc');
            });

            it('should correctly sort movies by vote_average in descending order', () => {
                cy.get('#sort-option-select').click();
                cy.get('[data-value="vote_average"]').click();
                cy.get('#sort-order-select').click();
                cy.get('[data-value="desc"]').click();
                checkSorting('.css-1isemmb', 'desc');
            });

            it('should correctly sort movies by vote_average in ascending order', () => {
                cy.get('#sort-option-select').click();
                cy.get('[data-value="vote_average"]').click();
                cy.get('#sort-order-select').click();
                cy.get('[data-value="asc"]').click();
                checkSorting('.css-1isemmb', 'asc');
            });
        });

    });

    describe("Combined sorting and new filter by release year", () => {

        it("show movies with the selected release year and sort them by popularity in ascending order", () => {
            const releaseYear = "2023";
            cy.get('#release-year-search').clear().type(releaseYear);
            cy.get('#sort-option-select').click();
            cy.get('[data-value="popularity"]').click();
            cy.get('#sort-order-select').click();
            cy.get('[data-value="asc"]').click();
            checkSorting('.css-ir5tdx', 'asc');
        });

        it("handles case when movies with the selected release year are no matches and can not be sorted", () => {
            const releaseYear = "2100";
            cy.get('#release-year-search').clear().type(releaseYear);
            // 选择“vote_average”作为排序选项
            cy.get('#sort-option-select').click();
            cy.get('[data-value="vote_average"]').click();

            // 选择“asc”作为排序顺序
            cy.get('#sort-order-select').click();
            cy.get('[data-value="asc"]').click();
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });
    });
});