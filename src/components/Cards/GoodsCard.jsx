import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Box, Fab } from '@mui/material';
import { Link } from 'react-router';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCart } from '../../features/context/CartContext';

function GoodsCard({ goods, deleteCallback }) {

  const { addToCart, removeFromCart, isInCart } = useCart();

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={goods.image}
        alt={goods.name}
        sx={{ objectFit: 'contain' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {goods.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {goods.description}
        </Typography>

        {goods.price && (
          <Typography variant="subtitle1" fontWeight="bold" color="success">
            Ціна: {Number(goods.price).toLocaleString()} ₴
          </Typography>
        )}
        <Box>
          {isInCart(goods.id) ? (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 2 }}
                            onClick={() => removeFromCart(goods.id)}
                        >
                            Remove from cart
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2 }}
                            onClick={() => addToCart(goods)}
                        >
                            Add to cart
                        </Button>
                    )}
        </Box>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
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
