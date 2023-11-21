import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import ToWatchMoviesListPage from "./pages/toWatchMoviesListPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PopularPeoplePage from "./pages/popularPeoplePage";
import PeopleDetailsPage from "./pages/peopleDetailsPage";
import SignUpPage from "./pages/signUpPage";
import SignInPage from "./pages/signInPage";
import WeekTrendingMoviesPage from "./pages/weekTrendingMoviesPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SiteHeader />
                <MoviesContextProvider>
                    <Routes>
                        <Route path="/people/popular" element={ <PopularPeoplePage /> } />
                        <Route path="/people/popular/:actorId" element={<PeopleDetailsPage/>}/>
                        <Route path="/movie/:movieId/people/popular/:actorId" element={<PeopleDetailsPage/>}/>
                        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                        <Route path="/movies/weektrending" element={<WeekTrendingMoviesPage/>}/>
                        <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                        <Route path="/movies/watchlist" element={<ToWatchMoviesListPage />} />
                        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
                        <Route path="/movies/:movieId" element={<MoviePage/>}/>
                        <Route path="/people/popular/:actorId/movies/:movieId" element={<MoviePage/>}/>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signin" element={<SignInPage/>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="*" element={ <Navigate to="/" /> } />
                    </Routes>
                </MoviesContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
