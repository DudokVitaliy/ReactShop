import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";

const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        let categories = [];
        const localData = localStorage.getItem("categories");
        if (localData) {
            categories = JSON.parse(localData);
        }

        const newData = [...categories, values];
        localStorage.setItem("categories", JSON.stringify(newData));
        navigate(-1);
    };

    const validSchema = Yup.object({
        name: Yup.string().required("Вкажіть ім'я категорії"),
    });

    const initValues = {
        name: "",
        description: "",
        image: "",
    };

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
        validationSchema: validSchema,
    });

    return (
            <Box
                sx={{
                    display: "flex",
                    width: "25%",
                    m: "0px auto",
                    p: "25px",
                }}
                flexDirection="column"
                alignItems="center"
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <Typography variant="h4">Створення категорії</Typography>
                <TextField
                    error={formik.touched.name && formik.errors.name}
                    helperText={formik.touched.name ? formik.errors.name : ""}
                    fullWidth
                    sx={{ m: 1 }}
                    label="Назва"
                    variant="standard"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Опис"
                    variant="standard"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Зображення"
                    variant="standard"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <Box>
                    <Button type="submit" sx={{ m: 1 }} variant="contained">
                        Додати
                    </Button>
                    <Link to={-1}>
                        <Button sx={{ m: 1 }} color="error" variant="contained">
                            Скасувати
                        </Button>
                    </Link>
                </Box>
            </Box>
    );
};

export default CategoryCreatePage;