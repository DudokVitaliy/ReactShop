import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button, Box, Fab } from '@mui/material';
import { Link } from 'react-router';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function GoodsCard({ goods, deleteCallback }) {
  return (
    <Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <CardMedia
          component="img"
          height="200"
          image={goods.image}
          alt={goods.name}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {goods.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {goods.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "end", m: 2 }}>
                <Link to={`edit/${goods.name}`}>
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
                    onClick={() => deleteCallback(goods.name)}
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
}

export default GoodsCard;
