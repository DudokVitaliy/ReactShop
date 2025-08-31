import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button } from '@mui/material';

function GoodsCard({ goods, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardActionArea>
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
      </CardActionArea>
      <Button onClick={onDelete}  variant="contained" color="error" sx={{ m: 1 }}>
        Видалити
      </Button>
    </Card>
  );
}

export default GoodsCard;
