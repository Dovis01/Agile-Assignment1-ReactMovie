import React, {lazy, Suspense} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import SiteHeader from './components/siteHeader'
const HomePage = lazy(() => import("./pages/homePage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const UpcomingMoviesPage = lazy(() => import("./pages/upcomingMoviesPage"));
const ToWatchMoviesListPage = lazy(() => import("./pages/toWatchMoviesListPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const AddMovieReviewPage = lazy(() => import("./pages/addMovieReviewPage"));
const PopularPeoplePage = lazy(() => import("./pages/popularPeoplePage"));
const PeopleDetailsPage = lazy(() => import("./pages/peopleDetailsPage"));
const SignUpPage = lazy(() => import("./pages/signUpPage"));
const SignInPage = lazy(() => import("./pages/signInPage"));
const WeekTrendingMoviesPage = lazy(() => import("./pages/weekTrendingMoviesPage"));


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
                <SiteHeader/>
                <MoviesContextProvider>
                    <Suspense fallback={<h1>Loading page</h1>}>
                        <Routes>
                            <Route path="/people/popular" element={<PopularPeoplePage/>}/>
                            <Route path="/people/popular/:actorId" element={<PeopleDetailsPage/>}/>
                            <Route path="/movie/:movieId/people/popular/:actorId" element={<PeopleDetailsPage/>}/>
                            <Route path="/movies/favorites" element={<FavoriteMoviesPage/>}/>
                            <Route path="/movies/weektrending" element={<WeekTrendingMoviesPage/>}/>
                            <Route path="/reviews/form" element={<AddMovieReviewPage/>}/>
                            <Route path="/movies/upcoming" element={<UpcomingMoviesPage/>}/>
                            <Route path="/movies/watchlist" element={<ToWatchMoviesListPage/>}/>
                            <Route path="/reviews/:id" element={<MovieReviewPage/>}/>
                            <Route path="/movies/:movieId" element={<MoviePage/>}/>
                            <Route path="/people/popular/:actorId/movies/:movieId" element={<MoviePage/>}/>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/signin" element={<SignInPage/>}/>
                            <Route path="/signup" element={<SignUpPage/>}/>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>
                    </Suspense>
                </MoviesContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App/>);
