let movies;
const movieId = 497582; // Enola Holmes movie id

describe("The toWatchList feature", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/movies/upcoming");
    });

    describe("Selecting movies to watch", () => {
        it("selected movie card shows the green avatar", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
            cy.get("button[aria-label='add to watch']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg");
        });
    });

    describe("The to watch list page", () => {
        beforeEach(() => {
            // Select two favourites and navigate to Favourites page
            cy.get("button[aria-label='add to watch']").eq(1).click();
            cy.get("button[aria-label='add to watch']").eq(3).click();
            cy.get("button").contains("ToWatchList").click();
        });
        it("only the tagged movies are listed", () => {
            cy.get(".MuiCardHeader-content").should("have.length", 2);
            cy.get(".MuiCardHeader-content")
                .eq(0)
                .find("p")
                .contains(movies[1].title);
            cy.get(".MuiCardHeader-content")
                .eq(1)
                .find("p")
                .contains(movies[3].title);
        });
        it("removes deleted movies", () => {});
    });
});