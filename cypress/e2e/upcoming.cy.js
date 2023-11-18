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
        it("displays the page header and 20 movies", () => {
            cy.get("h3").contains("Upcoming Movies");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
        });

        it("displays the correct movie titles", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(movies[index].title);
            });
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