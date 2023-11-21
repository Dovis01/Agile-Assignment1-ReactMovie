import React, {lazy, Suspense} from "react";
import {useLocation} from "react-router-dom";
import MovieReview from "../components/movieReview";
const PageTemplate = lazy(() => import("../components/templateMoviePage"));

const MovieReviewPage = (props) => {
    let location = useLocation();
    const {movie, review} = location.state;

    return (
        <Suspense fallback={<h1>Loading page</h1>}>
            <PageTemplate movie={movie}>
                <MovieReview review={review}/>
            </PageTemplate>
        </Suspense>
    );
};

export default MovieReviewPage;