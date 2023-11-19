let movies;
const movieId = 497582; // Enola Holmes movie id

describe("The writing a review for a movie feature", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
        cy.get("button[aria-label='add to favorites']").eq(1).click();
        cy.get("button").contains("Favorites").click();
    });

    describe("The jump to writing reviews form page", () => {
        it("selected writing reviews button and link to review form page", () => {
            cy.get('a [data-testid="RateReviewIcon"]').click();
            cy.url().should('include', `/reviews/form`);
        });
    });

    describe("The review form page", () => {
        beforeEach(() => {
            cy.get('a [data-testid="RateReviewIcon"]').click();
        });
        it('User can submit reviews successfully', () => {
            cy.get('input#author').type('Zhang San');
            cy.get('textarea#review').type('This ia a test review.');
            cy.get('div#select-rating').click();
            cy.get('li').contains('Excellent').click();
            cy.get('button[type="submit"]').click();
            cy.get('.MuiAlert-message').should('contain', 'Thank you for submitting a review');
            cy.get('.MuiAlert-message').should('be.visible');
        });
        it('User can not submit due to the lack of information ', () => {
            cy.get('input#author').clear();
            cy.get('textarea#review').clear();
            cy.get('div#select-rating').click();
            cy.get('li').contains('Average').click();
            cy.get('button[type="submit"]').click();
            cy.get('.MuiAlert-message').should('not.exist');
            cy.get('p').contains('Name is required').should('be.visible');
            cy.get('p').contains('Review cannot be empty').should('be.visible');
        });
    });
});