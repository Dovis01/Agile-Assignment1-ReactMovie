import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import UpcomingMoviesPage from '../../src/pages/upcomingMoviesPage';
import {getUpcomingMovies} from '../../src/api/tmdb-api';
import {ReactQueryDevtools} from "react-query/devtools";
import {BrowserRouter as Router} from 'react-router-dom';
import MoviesContextProvider from '../../src/contexts/moviesContext';

const mockUpcomingMovies = {
    "dates": {
        "maximum": "2023-05-23",
        "minimum": "2023-05-04"
    },
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg",
            "genre_ids": [27, 53],
            "id": 713704,
            "original_language": "en",
            "original_title": "Evil Dead Rise",
            "overview": "Two sisters find an ancient vinyl...",
            "popularity": 1696.367,
            "poster_path": "/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg",
            "release_date": "2023-04-12",
            "title": "Evil Dead Rise",
            "video": false,
            "vote_average": 7,
            "vote_count": 207
        },
        {
            "adult": false,
            "backdrop_path": "/5Y5pz0NX7SZS9036I733F7uNcwK.jpg",
            "genre_ids": [
                27,
                53
            ],
            "id": 758323,
            "original_language": "en",
            "original_title": "The Pope's Exorcist",
            "overview": "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a young boy's terrifying possession and ends up uncovering a centuries-old conspiracy the Vatican has desperately tried to keep hidden.",
            "popularity": 1073.229,
            "poster_path": "/9JBEPLTPSm0d1mbEcLxULjJq9Eh.jpg",
            "release_date": "2023-04-05",
            "title": "The Pope's Exorcist",
            "video": false,
            "vote_average": 6.5,
            "vote_count": 143
        }
    ],
    "total_pages": 19,
    "total_results": 369
};

const queryClient = new QueryClient();

describe('UpcomingMoviesPage Component Tests', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.intercept('GET', 'https://api.themoviedb.org/3/movie/upcoming?api_key=3949a8e40149fe7ea222fce59c7d0f73&language=en-US&page=1', mockUpcomingMovies).as('getUpcomingMovies');
        cy.mount(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <MoviesContextProvider>
                        <UpcomingMoviesPage/>
                    </MoviesContextProvider>
                </Router>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        );
    });

    it('renders the movies after fetching', () => {
        cy.wait('@getUpcomingMovies'); // Wait for the API call to complete
        cy.get('div.MuiGrid-root.MuiGrid-container.MuiGrid-item').should('be.visible');
        cy.get('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation5.MuiCard-root').should('have.length', mockUpcomingMovies.results.length);
    });

    it('includes the correct title for each movie', () => {
        cy.wait('@getUpcomingMovies');
        cy.get('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation5.MuiCard-root').each(($el, index) => {
            cy.wrap($el).find('p.MuiTypography-root.MuiTypography-h5').should('contain.text', mockUpcomingMovies.results[index].title);
        });
    });

    it('includes add to favorites and watch list buttons for each movie', () => {
        cy.wait('@getUpcomingMovies');
        cy.get('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation5.MuiCard-root').each(($el, index) => {
            cy.wrap($el).find('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium').should('have.length', '2');
            cy.wrap($el).find('button[aria-label="add to favorites"]').should('be.visible');
            cy.wrap($el).find('button[aria-label="add to watch"]').should('be.visible');
        });
    });
});