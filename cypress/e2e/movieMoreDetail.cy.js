let movie;
let movieID = 670292;
let movieActors;
let movieVideo;
describe("The movie more details test", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/movie/${
                movieID
            }?api_key=${Cypress.env("TMDB_KEY")}`
        )
            .its("body")
            .then((data) => {
                movie = data;
            });
        cy.request(
            `https://api.themoviedb.org/3/movie/${
                movieID
            }/credits?api_key=${Cypress.env("TMDB_KEY")}`
        )
            .its("body")
            .then((actors) => {
                movieActors = actors.cast;
            });
        cy.request(
            `https://api.themoviedb.org/3/movie/${
                movieID
            }/videos?api_key=${Cypress.env("TMDB_KEY")}`
        )
            .its("body")
            .then((video) => {
                movieVideo = video.results;
            });
    });
    beforeEach(() => {
        cy.visit(`/movies/${movieID}`);
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

    it(" should display the movie runtime, revenue, vote average and release date", () => {
        cy.get("p")
            .next()
            .next()
            .within(() => {
                const runtime = movie.runtime+" min.";
                const revenue = movie.revenue.toLocaleString();
                const detailRate=movie.vote_average+" ("+movie.vote_count;
                const release ="Released: "+ movie.release_date;
                cy.get('svg[data-testid="AccessTimeIcon"]+span').contains(runtime);
                cy.get('svg[data-testid="MonetizationOnIcon"]+span').contains(revenue);
                cy.get('svg[data-testid="StarRateIcon"]+span').contains(detailRate);
                cy.get('div.MuiChip-root.MuiChip-filled.MuiChip-sizeMedium span').should("contain.text",release);
            });
    });

    it("should display the movie related actors and link to actor detail page", () => {
        const firstMovieActor = movieActors[0];
        cy.get('div.MuiBox-root.css-al221i').should('exist').as('actorCardBox');
        cy.get('@actorCardBox').find('img.MuiCardMedia-root').should('be.visible').and('have.attr', 'alt').and('not.be.empty');
        cy.get('@actorCardBox').find('div.MuiTypography-root.MuiTypography-h6').should('contain.text', firstMovieActor.name);
        cy.get('@actorCardBox').find('p.MuiTypography-root.MuiTypography-body2').eq(0).should('contain.text', firstMovieActor.character);
        cy.get('@actorCardBox').find('p.MuiTypography-root.MuiTypography-body2').eq(1).should('contain.text', firstMovieActor.known_for_department);
        cy.get('@actorCardBox').find('button.MuiButtonBase-root').eq(0).click();
        cy.url().should('include', `/people/popular/${firstMovieActor.id}`);
    });

    it(" should display the movie related videos", () => {
        cy.get('div[style="margin-bottom: 20px;"]').eq(0).should('exist').as('firstVideoBox');
        cy.get('@firstVideoBox').find('.MuiCardMedia-root.MuiCardMedia-media.MuiCardMedia-img').should('be.visible').and('have.attr', 'alt', 'Video Thumbnail');
        cy.get('@firstVideoBox').find('.MuiButtonBase-root.MuiCardActionArea-root').click();
        cy.get('iframe')
            .should('have.attr', 'src')
            .and('include', 'https://www.youtube.com/embed/'); // 确认src属性包含YouTube链接
        cy.get('iframe').invoke('attr', 'src').should('eq', `https://www.youtube.com/embed/${movieVideo[0].key}`);
    });
});