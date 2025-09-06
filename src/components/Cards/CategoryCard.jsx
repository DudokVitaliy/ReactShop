import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Fab } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router";

const CategoryCard = ({ category, deleteCallback }) => {
    return (
        <Card sx={{ maxWidth: 345, height: "100%" }}>
            <CardMedia
                component="img"
                height="auto"
                image={category.image}
                alt={category.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {category.description}
                </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "end", m: 2 }}>
                <Link to={`edit/${category.name}`}>
                    <Fab
                        sx={{ mx: 1 }}
                        size="small"
                        color="success"
                        aria-label="edit"
                    >
                        <EditIcon />
                    </Fab>
                </Link>
                <Fab
                    onClick={() => deleteCallback(category.name)}
                    sx={{ mx: 1 }}
                    size="small"
                    color="error"
                    aria-label="delete"
                >
                    <DeleteIcon />
                </Fab>
            </Box>
        </Card>
    );
};

export default CategoryCard;