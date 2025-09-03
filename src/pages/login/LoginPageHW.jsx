import React from "react";
import { Container, Box, Typography, TextField, Button, Card, FormLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Ім'я обов'язкове"),
  lastName: Yup.string().required("Прізвище обов'язкове"),
  email: Yup.string().email("Невірний формат пошти").required("Пошта обов'язкова"),
  password: Yup.string()
    .min(6, "Пароль має бути не менше 6 символів")
    .required("Пароль обов'язковий"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролі не збігаються")
    .required("Підтвердження паролю обов'язкове"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Номер телефону має містити 10 цифр")
    .required("Номер телефону обов'язковий"),
  address: Yup.string().required("Адреса обов'язкова"),
});

function RegistrationPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...userData } = values;
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" mb={3} fontWeight={600} color="primary.main">
          Реєстрація
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { name: "firstName", label: "Ім'я" },
            { name: "lastName", label: "Прізвище" },
            { name: "email", label: "Пошта", type: "email" },
            { name: "password", label: "Пароль", type: "password" },
            { name: "confirmPassword", label: "Підтвердження паролю", type: "password" },
            { name: "phone", label: "Номер телефону" },
            { name: "address", label: "Адреса проживання" },
          ].map((field) => (
            <div key={field.name}>
              <FormLabel sx={{ mb: 0.5, display: "block", fontWeight: 500 }}>{field.label}</FormLabel>
              <TextField
                fullWidth
                name={field.name}
                type={field.type || "text"}
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
            Зареєструватися
          </Button>

          <Typography textAlign="center" mt={2}>
            Вже є аккаунт? <Link to="/login">
              <Button variant="text" size="small">
                Увійти
              </Button>
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}

export default RegistrationPage;
