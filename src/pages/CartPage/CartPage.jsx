import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../../features/context/CartContext";
import { useNavigate } from "react-router";

const CartPage = () => {
  const navigate = useNavigate();

  const {
    cartList,
    setCartList,
    removeFromCart,
  } = useCart();

  const increaseQty = (id) => {
    const updated = cartList.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setCartList(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (id) => {
    const updated = cartList
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0); // Якщо 0 → видалити

    setCartList(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    setCartList([]);
    localStorage.removeItem("cart");
    navigate("/products");
  };

  const totalPrice = cartList.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        🛒 Кошик
      </Typography>

      {cartList.length === 0 ? (
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Кошик порожній 😢
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/products")}
            sx={{ mt: 2 }}
          >
            Перейти до товарів
          </Button>
        </Box>
      ) : (
        <>
          <Stack spacing={2} mt={2}>
            {cartList.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Ціна: {item.price.toLocaleString()} ₴
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => decreaseQty(item.id)} color="primary">
                      <Remove />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.count}</Typography>
                    <IconButton onClick={() => increaseQty(item.id)} color="primary">
                      <Add />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      sx={{ ml: 2 }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Загальна сума: {totalPrice.toLocaleString()} ₴
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/products")}>
                Продовжити покупки
              </Button>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Оформити замовлення
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
