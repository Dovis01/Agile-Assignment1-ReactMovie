import React, {lazy, Suspense} from "react";
import {useParams} from 'react-router-dom';
import {getMovie} from '../api/tmdb-api'
import {useQuery} from "react-query";
import Spinner from '../components/spinner'
import MovieDetails from "../components/movieDetails";
import MovieDetailActorCardVideo from "../components/movieDetailActorCardVideo";

const PageTemplate = lazy(() => import("../components/templateMoviePage"));


const MoviePage = () => {
    const {movieId} = useParams();
    const {data: movie, error, isLoading, isError} = useQuery(
        ["movie", {id: movieId}],
        getMovie
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {movie ? (
                <>
                    <Suspense fallback={<h1>Loading page</h1>}>
                        <PageTemplate movie={movie}>
                            <MovieDetails movie={movie}/>
                            <MovieDetailActorCardVideo movie={movie}/>
                        </PageTemplate>
                    </Suspense>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MoviePage;