import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {getWeekTrendingMovies} from '../../src/api/tmdb-api';
import {ReactQueryDevtools} from "react-query/devtools";
import {BrowserRouter as Router} from 'react-router-dom';
import MoviesContextProvider from '../../src/contexts/moviesContext';
import WeekTrendingMoviesPage from "../../src/pages/weekTrendingMoviesPage";

const mockWeekTrendingMovies = {
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/44immBwzhDVyjn87b3x3l9mlhAD.jpg",
            "id": 934433,
            "title": "Scream VI",
            "original_language": "en",
            "original_title": "Scream VI",
            "overview": "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
            "poster_path": "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
            "media_type": "movie",
            "genre_ids": [
                27,
                9648,
                53
            ],
            "popularity": 609.941,
            "release_date": "2023-03-08",
            "video": false,
            "vote_average": 7.374,
            "vote_count": 684
        },
        {
            "adult": false,
            "backdrop_path": "/b9UCfDzwiWw7mIFsIQR9ZJUeh7q.jpg",
            "id": 868759,
            "title": "Ghosted",
            "original_language": "en",
            "original_title": "Ghosted",
            "overview": "Salt-of-the-earth Cole falls head over heels for enigmatic Sadie — but then makes the shocking discovery that she’s a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world.",
            "poster_path": "/liLN69YgoovHVgmlHJ876PKi5Yi.jpg",
            "media_type": "movie",
            "genre_ids": [
                10749,
                28,
                35
            ],
            "popularity": 619.83,
            "release_date": "2023-04-21",
            "video": false,
            "vote_average": 7.318,
            "vote_count": 359
        }
    ],
    "total_pages": 19,
    "total_results": 369
};

const queryClient = new QueryClient();

describe('WeekTrendingMoviesPage Component Tests', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?api_key=3949a8e40149fe7ea222fce59c7d0f73&language=en-US&page=1', mockWeekTrendingMovies).as('getWeekTrendingMovies');
        cy.mount(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <MoviesContextProvider>
                        <WeekTrendingMoviesPage/>
                    </MoviesContextProvider>
                </Router>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        );
    });

    it('renders the movies after fetching', () => {
        cy.wait('@getWeekTrendingMovies'); // Wait for the API call to complete
        cy.get('div.MuiGrid-root.MuiGrid-container.MuiGrid-item').should('be.visible');
        cy.get('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation5.MuiCard-root').should('have.length', mockWeekTrendingMovies.results.length);
    });

    it('includes the correct title for each movie', () => {
        cy.wait('@getWeekTrendingMovies');
        cy.get('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation5.MuiCard-root').each(($el, index) => {
            cy.wrap($el).find('p.MuiTypography-root.MuiTypography-h5').should('contain.text', mockWeekTrendingMovies.results[index].title);
        });
    });

    it('includes add to favorites and watch list buttons for each movie', () => {
        cy.wait('@getWeekTrendingMovies');
        cy.get('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation5.MuiCard-root').each(($el) => {
            cy.wrap($el).find('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium').should('have.length', '2');
            cy.wrap($el).find('button[aria-label="add to favorites"]').should('be.visible');
            cy.wrap($el).find('button[aria-label="add to watch"]').should('be.visible');
        });
    });
});