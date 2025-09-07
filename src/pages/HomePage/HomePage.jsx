
import { useEffect, useState } from "react";
import { Grid, Pagination, Box, Typography } from "@mui/material";
import axios from "axios";
import NewsCard from "../../components/cards/NewsCard";

const HomePage = () => {
    const [news, setNews] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 24,
        pageCount: 1,
    });

    const fetchNews = async () => {
        try {
            const apiKey = "eef038525fa7401d8dfe7cf1a9006b10";
            const url = `https://newsapi.org/v2/everything?q=it&apiKey=${apiKey}&language=uk&pageSize=${pagination.pageSize}&page=${pagination.page}`;
            const { data, status } = await axios.get(url);
            if (status === 200) {
                const { articles, totalResults } = data;
                setPagination({
                    ...pagination,
                    pageCount: Math.ceil(totalResults / pagination.pageSize),
                });
                setNews(articles);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePagination = (event, value) => {
        setPagination({ ...pagination, page: value });
    };

    useEffect(() => {
        fetchNews();
    }, [pagination.page]);

    return (
        <>
            {news.length > 0 ? (
                <>
                    <Grid container spacing={1}>
                        {news.map((article, index) => (
                            <Grid key={index} size={4}>
                                <NewsCard article={article} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            my: 3,
                        }}
                    >
                        <Pagination
                            count={pagination.pageCount}
                            color="primary"
                            page={pagination.page}
                            onChange={handlePagination}
                        />
                    </Box>
                </>
            ) : (
                <Box textAlign="center">
                    <Typography variant="h4">
                        Не вдалося отримати новини
                    </Typography>
                    <img src="https://media.istockphoto.com/id/1502566878/vector/oops-comic-speech-with-boom-lettering-oops-comics-book-text-balloon-bubble-icon-speech.jpg?s=612x612&w=0&k=20&c=MpMKpNrTndZESln3jLQkAHguP_m5-bPT9dZ5aHeErrQ=" />
                </Box>
            )}
        </>
    );
};

export default HomePage;
