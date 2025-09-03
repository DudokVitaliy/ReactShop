import React from "react";
import { Container, Box, Typography, TextField, Button, Card, FormLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const validationSchema = Yup.object({
  email: Yup.string().email("Невірний формат пошти").required("Пошта обов'язкова"),
  password: Yup.string().required("Пароль обов'язковий"),
});

function LoginPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === values.email && u.password === values.password);

      if (user) {
        navigate("/products");
      } else {
        alert("Невірна пошта або пароль!");
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" mb={3} fontWeight={600} color="primary.main">
          Вхід
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { name: "email", label: "Пошта", type: "email" },
            { name: "password", label: "Пароль", type: "password" },
          ].map((field) => (
            <div key={field.name}>
              <FormLabel sx={{ mb: 0.5, display: "block", fontWeight: 500 }}>{field.label}</FormLabel>
              <TextField
                fullWidth
                name={field.name}
                type={field.type}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                helperText={formik.touched[field.name] && formik.errors[field.name]}
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </div>
          ))}

          <Button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2, fontSize: "1rem", fontWeight: "bold", borderRadius: 2 }}
          >
            Увійти
          </Button>

          <Typography textAlign="center" mt={2}>
            Немає акаунту? <Link to="/register">
            <Button variant="text" size="small">
            Зареєструватися
            </Button>
            </Link>

          </Typography>
        </Box>
      </Card>
    </Container>
  );
}

export default LoginPage;
