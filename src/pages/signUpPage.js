import React, {lazy, Suspense} from "react";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../theme/background";
import Header from "../components/headerMovieList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const ThirdPartyAuthSignUp = lazy(() => import("../components/thirdPartyAuthSignUp"));

const SignUpPage = () => {
    const title = "Sign Up Page";

    return (
        <Grid container sx={{padding: '20px', height: '92%'}} style={backgroundImageStyles.backgroundMainContainer}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{mt: '-400px'}}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5} sx={{p: 16}}>
                    <Typography component="h4" variant="h4" sx={{textAlign: 'center', mt: '-70px'}}>
                        {"Sign Up "}
                    </Typography>
                    <Box component="form" noValidate
                         sx={{mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Suspense fallback={<h1>Loading component</h1>}>
                            <ThirdPartyAuthSignUp/>
                        </Suspense>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SignUpPage;