let actors;
let actor;
let movieCredits;
let tvCredits;

describe("The actor related page tests", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                actors = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/people/popular");
    });

    describe("The actor list page test", () => {

        it("should display the page header, 20 actors and correct actor card titles", () => {
            cy.testActorListPage("Popular People", actors);
        });

        it(" should navigate to actor details page from actor list page by button", () => {
            cy.get('.MuiCard-root').eq(7).find('button').contains('More Info ...').click();
            cy.url().should("include", `/people/popular/${actors[7].id}`);
        });
    });

    describe("The actor details page test", () => {
        before(() => {
            cy.request(
                `https://api.themoviedb.org/3/person/${
                    actors[5].id
                }?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((actorDetails) => {
                    actor = actorDetails;
                });
            cy.request(
                `https://api.themoviedb.org/3/person/${
                    actors[5].id
                }/movie_credits?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((movieDetails) => {
                    movieCredits = movieDetails.cast;
                });
            cy.request(
                `https://api.themoviedb.org/3/person/${
                    actors[5].id
                }/tv_credits?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((tvDetails) => {
                    tvCredits = tvDetails.cast;
                });
        });
        beforeEach(() => {
            cy.visit(`/people/popular/${actors[5].id}`);
        });

        it(" should display the actor name, known for department and overview", () => {
            cy.get("h3").contains(actor.name);
            cy.get("p.MuiTypography-root.MuiTypography-h5").contains(actor.known_for_department);
            cy.get("h3").contains("Overview");
            cy.get("p.MuiTypography-root.MuiTypography-h6").should('contain.text', actor.biography);
        });

        it(" should display the actor known as, birthday, place of birth, popularity and gender", () => {
            cy.get("p")
                .next()
                .within(() => {
                    const knownAs = actor.also_known_as;
                    knownAs.unshift("KnownAs");
                    cy.get("span").each(($card, index) => {
                        cy.wrap($card).contains(knownAs[index]);
                    });
                });
            cy.get("p")
                .next()
                .next()
                .within(() => {
                    const birthday = actor.birthday;
                    const placeOfBirth = actor.place_of_birth;
                    const popularity = actor.popularity;
                    cy.get('svg[data-testid="CakeIcon"]+span').contains(birthday);
                    cy.get('svg[data-testid="VillaIcon"]+span').contains(placeOfBirth);
                    cy.get('svg[data-testid="AutoAwesomeIcon"]+span').contains(popularity);
                });
            cy.get("p")
                .next()
                .next()
                .next()
                .within(() => {
                    const gender = actor.gender === 1 ? "Female" : "Male";
                    cy.get('svg[data-testid="ManOutlinedIcon"] + span').contains(gender);
                });
        });

        it("should display the actor related movie credits and link to movie detail page", () => {
            const firstMovieCredit = movieCredits[0]; // 确保这个对象已经定义并包含title和id属性
            cy.get('div.MuiBox-root.css-al221i').eq(0).should('exist').as('firstCardBox');
            cy.get('@firstCardBox').find('img.MuiCardMedia-root').should('be.visible').and('have.attr', 'alt').and('not.be.empty');
            cy.get('@firstCardBox').find('div.MuiTypography-root.MuiTypography-h6').should('contain.text', firstMovieCredit.title);
            cy.get('@firstCardBox').find('span.MuiTypography-body2').eq(0).should('contain.text', firstMovieCredit.character);
            cy.get('@firstCardBox').find('span.MuiTypography-body2').eq(1).should('contain.text', firstMovieCredit.release_date);
            cy.get('@firstCardBox').find('span.MuiTypography-body2').eq(2).should('contain.text', firstMovieCredit.vote_average.toFixed(1));
            cy.get('@firstCardBox').find('button.MuiButtonBase-root').eq(0).click();
            cy.url().should('include', `/movies/${firstMovieCredit.id}`);
        });

        it(" should display the actor related TV credits", () => {
            const firstTvCredit = tvCredits[0];
            cy.get('div.MuiBox-root.css-al221i').eq(1).should('exist').as('secondCardBox');
            cy.get('@secondCardBox').find('img.MuiCardMedia-root').should('be.visible').and('have.attr', 'src').and('not.be.empty');
            cy.get('@secondCardBox').find('div.MuiTypography-root.MuiTypography-h6').should('contain.text', firstTvCredit.name);
            cy.get('@secondCardBox').find('span.MuiTypography-root.MuiTypography-h7').eq(0).should('contain.text', firstTvCredit.character);
            cy.get('@secondCardBox').find('span.MuiTypography-root.MuiTypography-h7').eq(1).should('contain.text', firstTvCredit.first_air_date);
            cy.get('@secondCardBox').find('span.MuiTypography-root.MuiTypography-h7').eq(2).should('contain.text', firstTvCredit.vote_average.toFixed(1));
        });
    });
});