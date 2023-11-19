let movies;
const pageTitle = "Discover Movies";
describe("Pagination component tests", () => {
    describe("The Discover Movies page test", () => {
        before(() => {
            // Get the discover movies from TMDB and store them locally.
            cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                    "TMDB_KEY"
                )}&language=en-US&include_adult=false&include_video=false&page=1`
            )
                .its("body") // Take the body of HTTP response from TMDB
                .then((response) => {
                    movies = response.results;
                });
        });
        beforeEach(() => {
            cy.visit("/");
        });

        it('should render the pagination component', () => {
            cy.get('.MuiPagination-root').should('exist');
        });

        it('should navigate to the next page when next button is clicked', () => {
            const currentPage = cy.get('.Mui-selected').invoke('text');
            cy.get('[aria-label="Go to next page"]').click();
            cy.get('.Mui-selected').should('not.have.text', currentPage);
            cy.testListPageByPage(pageTitle, 2);
        });

        it('should navigate to a specific page when a page number is clicked', () => {
            cy.get('[aria-label="Go to page 3"]').click();
            cy.get('[aria-label="page 3"]').should('have.class', 'Mui-selected');
            cy.testListPageByPage(pageTitle, 3);
        });

        it('should navigate to the first page when Go to first page button is clicked', () => {
            cy.get('[aria-label="Go to last page"]').click();
            cy.get('[aria-label="Go to first page"]').click();
            cy.get('[aria-label="page 1"]').should('have.class', 'Mui-selected');
            cy.testListPageByPage(pageTitle, 1);
        });

        it('should navigate to the last page when Go to last page button is clicked', () => {
            cy.get('[aria-label="Go to last page"]').click();
            cy.get('[aria-label="page 500"]').should('have.class', 'Mui-selected');
            cy.testListPageByPage(pageTitle, 500);
        });

        //Error or Exception testing
        it('should have disabled next button on the last page', () => {
            cy.get('[aria-label="Go to last page"]').click();
            cy.get('[aria-label="Go to next page"]').should('be.disabled').click({force: true});
            cy.get('[aria-label="page 500"]').should('have.class', 'Mui-selected');
            cy.testListPageByPage(pageTitle, 500);
        });

        it('should not navigate to the previous page when the previous button is disabled and clicked on page 1', () => {
            cy.get('[aria-label="Go to previous page"]').should('be.disabled').click({force: true});
            cy.get('[aria-label="page 1"]').should('have.class', 'Mui-selected');
            cy.testListPageByPage(pageTitle, 1);
        });
    });
});