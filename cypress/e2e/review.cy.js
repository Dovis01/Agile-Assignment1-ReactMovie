let movies;
let movie;
let reviews;

describe("The movie review feature", () => {
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
    });

    describe("Check some movie's reviews", () => {
        before(() => {
            cy.request(
                `https://api.themoviedb.org/3/movie/${
                    movies[1].id
                }?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((movieDetails) => {
                    movie = movieDetails;
                });
        });
        it("select some movie and check its all existing brief reviews", () => {
            cy.get('button.css-1rwt2y5-MuiButtonBase-root-MuiButton-root').eq(1).click();
            cy.contains('button', 'Reviews').click();
            cy.get('tbody.MuiTableBody-root').find('tr.MuiTableRow-root').its('length').should('be.gt', 0);
        });
        describe("Check some movie's some full review page", () => {
            before(() => {
                cy.request(
                    `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${Cypress.env(
                        "TMDB_KEY"
                    )}&language=en-US&include_adult=false&include_video=false&page=1`
                )
                    .its("body")
                    .then((response) => {
                        reviews = response.results;
                    });
            });
            beforeEach(() => {
                cy.visit(`/movies/${movie.id}`);
                cy.contains('button', 'Reviews').click();
            });
            it("select some review and check its full content page", () => {
                // 进行页面内容验证...
                cy.get('tbody.MuiTableBody-root').find('tr.MuiTableRow-root').first().find('a').contains('Full Review').click();
                cy.url().should('include', `/reviews/${reviews[0].id}`);
                cy.get("h3").contains(movie.title);
                cy.get("h3").contains("Review By:");
                cy.get("h3").contains(reviews[0].author);
                cy.get("p.MuiTypography-root.MuiTypography-h6").should("contain.text",reviews[0].content);
            });
        });
    });
});