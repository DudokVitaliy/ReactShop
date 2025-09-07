import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";

const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
];

const NewsCard = ({ article }) => {
    const [liked, setLiked] = useState(false);

    const handleLikeChange = () => {
        setLiked(!liked);
    };

    const convertDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${
            months[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <Card sx={{ maxWidth: 345, minHeight: "100%" }}>
            <CardMedia
                component="img"
                height="194"
                image={article.urlToImage}
                alt={article.title}
            />
            <CardHeader
                title={article.title}
                subheader={convertDate(article.publishedAt)}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {article.author}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handleLikeChange}
                >
                    {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
                <a target="_blank" href={article.url}>
                    <IconButton aria-label="share">
                        <LinkIcon />
                    </IconButton>
                </a>
            </CardActions>
        </Card>
    );
};

export default NewsCard;