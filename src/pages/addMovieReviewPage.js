import React, {lazy, Suspense} from "react";
import PageTemplate from "../components/templateMoviePage";
import {useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {getMovie} from "../api/tmdb-api";
import Spinner from "../components/spinner";

const ReviewForm = lazy(() => import("../components/reviewForm"));

const WriteReviewPage = (props) => {
    const location = useLocation();
    const movieId = location.state.movieId;

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
        <PageTemplate movie={movie}>
            <Suspense fallback={<h1>Loading component</h1>}>
                <ReviewForm movie={movie}/>
            </Suspense>
        </PageTemplate>
    );
};

export default WriteReviewPage;