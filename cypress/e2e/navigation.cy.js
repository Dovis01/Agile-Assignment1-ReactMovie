let movies;
let upcomingMovies;

describe("The navigation feature test", () => {
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
        cy.request(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                upcomingMovies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
    });

    describe("Test navigation from the card list page to a details page", () => {
        it("should navigate to the discover movie details page from homepage and change browser URL", () => {
            cy.testNavigationToDetailPage("movies",movies[0].id);
        });
    });


    describe("Test all buttons on the site header", () => {
        describe("when the viewport is desktop scale", () => {
            it("navigate via the button links", () => {
                cy.get("button").contains("Upcoming").click();
                cy.url().should("include", `/movies/upcoming`);
                cy.get("button").contains("Week Trending").click();
                cy.url().should("include", `/movies/weektrending`);
                cy.get("button").contains("Popular people").click();
                cy.url().should("include", `/people/popular`);
                cy.get("button").contains("Favorites").click();
                cy.url().should("include", `/movies/favorites`);
                cy.get("button").contains("ToWatchList").click();
                cy.url().should("include", `/movies/watchlist`);
                cy.get("button").contains("SignIn").click();
                cy.url().should("include", `/signin`);
            });
        });
        describe(
            "when the viewport is mobile scale",
            {
                viewportHeight: 896,
                viewportWidth: 414,
            },
            () => {
                it("navigate via the dropdown menu", () => {
                    cy.get("header").find("button").click();
                    cy.get("li").contains('Upcoming').click();
                    cy.url().should("include", `/movies/upcoming`);
                    cy.get("li").contains('Week Trending').click();
                    cy.url().should("include", `/movies/weektrending`);
                    cy.get("li").contains('Popular people').click();
                    cy.url().should("include", `/people/popular`);
                    cy.get("li").contains('Favorites').click();
                    cy.url().should("include", `/movies/favorites`);
                    cy.get("li").contains('ToWatchList').click();
                    cy.url().should("include", `/movies/watchlist`);
                    cy.get("li").contains('SignIn').click();
                    cy.url().should("include", `/signin`);
                });
            }
        );
    });

    describe("The forward/backward links feature test", () => {

        describe("The complicated forward/backward links test from the to watch list page to a movie's details", () => {
            beforeEach(() => {
                cy.visit("/movies/upcoming");
                cy.get("button[aria-label='add to watch']").eq(1).click();
                cy.get("button[aria-label='add to watch']").eq(3).click();
                cy.get("button[aria-label='add to watch']").eq(5).click();
                cy.get("button[aria-label='add to watch']").eq(6).click();
            });
            describe("when the viewport is desktop scale", () => {
                beforeEach(() => {
                    cy.get("button").contains("ToWatchList").click();
                });
                it("navigating between the ToWatchList movies page and the movie details page via the button and arrow icon.", () => {
                    cy.get(".MuiCardActions-root").eq(3).contains("More Info").click();
                    cy.url().should("include", `/movies/${upcomingMovies[6].id}`);
                    cy.get("svg[data-testid='ArrowBackIcon'").click();
                    cy.url().should("include", `/movies/watchlist`);
                    cy.get("svg[data-testid='ArrowForwardIcon'").click();
                    cy.url().should("include", `/movies/${upcomingMovies[6].id}`);
                });
            });
            describe(
                "when the viewport is mobile scale",
                {
                    viewportHeight: 896,
                    viewportWidth: 414,
                },
                () => {
                    beforeEach(() => {
                        cy.get("header").find("button").click();
                        cy.get("li").contains('ToWatchList').click();
                    });
                    it("navigating between the ToWatchList movies page and the movie details page via the dropdown menu and arrow icon.", () => {
                        cy.get(".MuiCardActions-root").eq(3).contains("More Info").click({force: true});
                        cy.url().should("include", `/movies/${upcomingMovies[6].id}`);
                        cy.get("svg[data-testid='ArrowBackIcon'").click({force: true});
                        cy.url().should("include", `/movies/watchlist`);
                        cy.get("svg[data-testid='ArrowForwardIcon'").click({force: true});
                        cy.url().should("include", `/movies/${upcomingMovies[6].id}`);
                    });
                }
            );
        });


        describe("The common forward/backward links test", () => {
            beforeEach(() => {
                cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
            });
            it("navigates between the movies detail page and the Home page via arrow icon.", () => {
                cy.get("svg[data-testid='ArrowBackIcon'").click();
                cy.url().should("not.include", `/movies/${movies[0].id}`);
                cy.get("svg[data-testid='ArrowForwardIcon'").click();
                cy.url().should("include", `/movies/${movies[0].id}`);
            });
        });
    });
});