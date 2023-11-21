import React, {lazy, Suspense} from "react";
import {useParams} from 'react-router-dom';
import {getPopularPeopleDetail} from '../api/tmdb-api'
import {useQuery} from "react-query";
import Spinner from '../components/spinner'
import PeopleDetails from "../components/peopleDetails";
import PeopleDetailMovieCredits from "../components/peopleDetailMovieCredits";
import PeopleDetailTVCredits from "../components/peopleDetailTVCredits";

const PeopleDetailPageTemplate = lazy(() => import("../components/templatePeoplePage"));

const PeoplePage = () => {
    const {actorId} = useParams();
    const {data: peopleDetail, error, isLoading, isError} = useQuery(
        ["popularPeopleDetails", {id: actorId}],
        getPopularPeopleDetail
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {peopleDetail ? (
                <>
                    <Suspense fallback={<h1>Loading page</h1>}>
                        <PeopleDetailPageTemplate actor={peopleDetail}>
                            <PeopleDetails actor={peopleDetail}/>
                            <PeopleDetailMovieCredits actor={peopleDetail}/>
                            <PeopleDetailTVCredits actor={peopleDetail}/>
                        </PeopleDetailPageTemplate>
                    </Suspense>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default PeoplePage;