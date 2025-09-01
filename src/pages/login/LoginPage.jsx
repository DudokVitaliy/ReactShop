import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

const LoginPage = () => {

    const handleSubmit = (values) => {
       if (values.rememberMe) {
        localStorage.setItem('user', JSON.stringify(values.email));
       }
    };
    const InitValue = {
        email: '',
        password: '',
        rememberMe: false,
    };

    const validSchema = Yup.object({
        email: Yup.string().email('Невірний формат пошти').required('Обов\'язкове поле'),
        password: Yup.string().min(6, 'Має містити 6 символів').required('Обов\'язкове поле'),
    });

    const formik = useFormik({
        initialValues: InitValue,
        onSubmit: handleSubmit,
        validationSchema: validSchema,
    });

    
    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: "100%",
                            fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        }}
                    >
                        Логін
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel error = {formik.touched.email && Boolean(formik.errors.email)} htmlFor="email">Пошта</FormLabel>
                            <TextField
                                error={formik.touched.email ? Boolean(formik.errors.email) : ""}
                                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            
                        </FormControl>
                        <FormControl>
                            <FormLabel error= {formik.touched.password && Boolean(formik.errors.password)} htmlFor="password">Пароль</FormLabel>
                            <TextField
                            error={formik.touched.password ? Boolean(formik.errors.password) : ""}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.password}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    onChange={formik.handleChange}
                                    checked = {formik.values.rememberMe} 
                                    name="rememberMe" 
                                    value="remember" 
                                    color="primary" />
                            }
                            label="Запам'ятати мене"
                        />
                        <Button disabled = {!formik.isValid} type="submit" fullWidth variant="contained">
                            Вхід
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </>
    );
};

export default LoginPage;