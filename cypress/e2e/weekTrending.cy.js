let movies;
let movie;

describe("The week trending movies page tests", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/movies/weektrending");
    });

    describe("The content of week trending movies page test", () => {

        it("should display the page header, 20 movies and the correct movie cards' title", () => {
            cy.testListPage("Week Trending Movies", movies);
        });

        it("should jump to movie details page by button from week trending movies page", () => {
            cy.get("button.MuiButton-outlined").contains("More Info ...").eq(0).click();
            cy.url().should("include", `/movies/${movies[0].id}`);
        });
    });

    describe("The week trending movie details page test", () => {
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
        it(" should display the movie title, overview, genres and production countries", () => {
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