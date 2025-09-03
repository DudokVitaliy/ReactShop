import { Box, Button, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Typography variant="h1">404</Typography>
                        <Typography variant="h6">
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Link to="/">
                            <Button variant="contained">Back Home</Button>
                        </Link>
                    </Grid>
                    <Grid size={6}>
                        <img
                            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                            alt=""
                            width={500}
                            height={250}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default NotFoundPage;