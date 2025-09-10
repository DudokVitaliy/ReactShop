import { 
  Box, Typography, TextField, Button, Card, 
  FormLabel, FormControlLabel, Checkbox 
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../features/context/AuthContex.jsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux";


const validationSchema = Yup.object({
  email: Yup.string().email("Невірний формат пошти").required("Пошта обов'язкова"),
  password: Yup.string().required("Пароль обов'язковий"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {

    dispatch({type:"LOGIN", payload: values})
    navigate("/", {replace:true})
    // const users = JSON.parse(localStorage.getItem("users")) || [];
    // const user = users.find(u => u.email === values.email && u.password === values.password);

    // if (user) {
    //   login(values);

    //   if (values.rememberMe) {
    //     localStorage.setItem("rememberedUser", JSON.stringify(user));
    //   } else {
    //     localStorage.removeItem("rememberedUser");
    //   }

    //   navigate("/");
    // } else {
    //   alert("Невірна пошта або пароль!");
    // }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    validationSchema,
    onSubmit: handleSubmit
  });
  const handleGoogleSuccess = (response) => {
    const userData = jwtDecode(response.credential); 
    googleLogin(userData)
    navigate("/")
  }
  const handleGoogleError = () => {
    console.log('Login Failed');
  }

  return (
    <GoogleOAuthProvider  clientId="450543476003-n7ncid6ikuiddsknen94mr53l97723tr.apps.googleusercontent.com">
      <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3, maxWidth: 400, mx: "auto", mt: 8 }}>
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

          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}

              />
            }
            label="Запам’ятати мене"
          />

          <Button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2, fontSize: "1rem", fontWeight: "bold", borderRadius: 2 }}
          >
            Увійти
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          </Box>

          <Typography textAlign="center" mt={2}>
            Немає акаунту?{" "}
            <Link to="/register">
              <Button variant="text" size="small">
                Зареєструватися
              </Button>
            </Link>
          </Typography>
        </Box>
      </Card>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
