import React, { useState } from "react";
import { Container, Card, Typography, Box, TextField, Button, Divider } from "@mui/material";
import { useAuth } from "../../features/context/AuthContex.jsx";
import { useNavigate } from "react-router";

function ProfilePage() {
  const { user } = useAuth();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!user) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" mb={2}>Ви не авторизовані</Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Увійти
        </Button>
      </Container>
    );
  }

  const handleChangePassword = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.email === user.email);

    if (!currentUser) {
      setMessage("Цей користувач створений через Google. Зміна паролю недоступна.");
      return;
    }

    if (currentUser.password !== oldPass) {
      setMessage("Старий пароль введено неправильно.");
      return;
    }

    currentUser.password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Пароль успішно змінено!");
  };

  return (
    <Container sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 4, maxWidth: 500, width: "100%", boxShadow: 6, borderRadius: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" mb={2} fontWeight={600} textAlign="center">
            Профіль
          </Typography>

          <Box sx={{ mb: 3 }}>
            <img 
              src={user.avatar || "https://i.pinimg.com/236x/63/1d/0c/631d0c92248b6a26393732d625c91e1c.jpg"} 
              alt="avatar" 
              style={{ width: 120, height: 120, borderRadius: "50%" }}
            />
          </Box>

          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography><b>Email:</b> {user.email}</Typography>
            {user.firstName && <Typography><b>Імʼя:</b> {user.firstName}</Typography>}
            {user.lastName && <Typography><b>Прізвище:</b> {user.lastName}</Typography>}
            {user.phone && <Typography><b>Телефон:</b> {user.phone}</Typography>}
            {user.address && <Typography><b>Адреса:</b> {user.address}</Typography>}
          </Box>

          {user.password && (
            <>
              <Divider sx={{ my: 3, width: "100%" }} />
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" mb={1}>Змінити пароль</Typography>
                <TextField
                  label="Старий пароль"
                  type="password"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
                <TextField
                  label="Новий пароль"
                  type="password"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={handleChangePassword}
                >
                  Змінити пароль
                </Button>
                {message && <Typography color="secondary" mt={2}>{message}</Typography>}
              </Box>
            </>
          )}

          <Button 
            variant="outlined" 
            sx={{ mt: 4, width: "100%" }} 
            onClick={() => navigate("/")}
          >
            На головну
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default ProfilePage;
