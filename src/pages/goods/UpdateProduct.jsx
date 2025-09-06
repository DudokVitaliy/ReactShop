import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import * as Yup from "yup";

const UpdateProduct = () => {
    const [oldProduct, setOldProduct] = useState({
        name: "",
        description: "",
        image: "",
    });
    const navigate = useNavigate();
    const { name } = useParams();

    useEffect(() => {
        const localData = localStorage.getItem("goods");
        if (localData) {
            const products = JSON.parse(localData);
            const currentProduct = products.find((c) => c.name === name);
            if (currentProduct) {
                setOldProduct(currentProduct);
            } else {
                navigate("/", { replace: true });
            }
        } else {
            navigate("/", { replace: true });
        }
    }, []);

    const handleSubmit = (values) => {
        const localData = localStorage.getItem("goods");
        if (localData) {
            const products = JSON.parse(localData);
            const index = products.findIndex(
                (c) => c.name === oldProduct.name
            );
            if (index > -1) {
                products[index] = values;
                localStorage.setItem("goods", JSON.stringify(products));
                navigate(-1);
            }
        }
    };

    const validSchema = Yup.object({
        name: Yup.string().required("Вкажіть ім'я товару"),
    });

    const formik = useFormik({
        initialValues: oldProduct,
        onSubmit: handleSubmit,
        validationSchema: validSchema,
        enableReinitialize: true,
    });

    return (
            <Box
                sx={{
                    display: "flex",
                    width: "30%",
                    m: "0px auto",
                    p: "25px",
                }}
                flexDirection="column"
                alignItems="center"
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <Typography variant="h4">Редагування товару</Typography>
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
                        Зберегти
                    </Button>
                    <Link to={"/products"}>
                        <Button sx={{ m: 1 }} color="error" variant="contained">
                            Скасувати
                        </Button>
                    </Link>
                </Box>
            </Box>
    );
};

export default UpdateProduct;
