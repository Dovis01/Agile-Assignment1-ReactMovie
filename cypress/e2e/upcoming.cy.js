let movies; // List of movies from TMDB
let movie; //

describe("The upcoming movies page tests", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/movies/upcoming");
    });

    describe("The content of upcoming page test", () => {
        it("should display the page header, 20 movies and the correct movie cards' title", () => {
            cy.testListPage("Upcoming Movies", movies);
        });

        it("should jump to movie details page by button from upcoming movies page", () => {
            cy.testNavigationToDetailPage("movies",movies[0].id);
        });
    });

    describe("The selected icon button and avatar presentation for upcoming movie card test", () => {
        it("should movie card selected to favorites shows the red heart", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='FavoriteIcon']").should("not.exist");
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='FavoriteIcon']").should("exist");
        });
        it("should movie card selected to watch list shows the green avatar", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='PlaylistAddCheckIcon']").should("not.exist");
            cy.get("button[aria-label='add to watch']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='PlaylistAddCheckIcon']").should("exist");
        });
        it("should movie card selected to watch list and favorites shows both avatars", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='FavoriteIcon']").should("not.exist");
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='PlaylistAddCheckIcon']").should("not.exist");
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get("button[aria-label='add to watch']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='FavoriteIcon']").should("exist");
            cy.get(".MuiCardHeader-root").eq(1).find("svg[data-testid='PlaylistAddCheckIcon']").should("exist");
        });
    });

    describe("The upcoming movie details page", () => {
        before(() => {
            cy.request(
                `https://api.themoviedb.org/3/movie/${
                    movies[0].id
                }?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((movieDetails) => {
                    movie = movieDetails;
                });
        });
        beforeEach(() => {
            cy.visit(`/movies/${movies[0].id}`);
        });
        it(" displays the movie title, overview, genres and production countries", () => {
            cy.get("h3").contains(movie.title);
            cy.get("h3").contains("Overview");
            cy.get("h3").next().contains(movie.overview);
            cy.get("p")
                .next()
                .within(() => {
                    const genreChips = movie.genres.map((g) => g.name);
                    genreChips.unshift("Genres");
                    cy.get("span").each(($card, index) => {
                        cy.wrap($card).contains(genreChips[index]);
                    });
                });
            cy.get("p")
                .next()
                .next()
                .next()
                .within(() => {
                    const productionCountries = movie.production_countries.map((c) => c.name);
                    productionCountries.unshift("Production Countries");
                    cy.get("span").each(($card, index) => {
                        cy.wrap($card).contains(productionCountries[index]);
                    });
                });
        });
    });
});