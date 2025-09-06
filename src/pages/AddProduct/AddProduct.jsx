import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router";

const validationSchema = Yup.object({
  name: Yup.string().required("Назва обов'язкова"),
  description: Yup.string().required("Опис обов'язковий"),
  image: Yup.string().url("Некоректне посилання").required("Зображення обов'язкове"),
});

function AddProduct() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Додати товар
      </Typography>

      <Formik
        initialValues={{ name: "", description: "", image: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const storedGoods = JSON.parse(localStorage.getItem("goods")) || [];
          const updatedGoods = [...storedGoods, values];
          localStorage.setItem("goods", JSON.stringify(updatedGoods));
          navigate(-1);
        }}
      >
        {({ handleChange }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Field
                name="name"
                as={TextField}
                label="Назва"
                variant="outlined"
                onChange={handleChange}
                fullWidth
              />
              <ErrorMessage name="name" component="div" style={{ color: "red" }} />

              <Field
                name="description"
                as={TextField}
                label="Опис"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
              <ErrorMessage name="description" component="div" style={{ color: "red" }} />

              <Field
                name="image"
                as={TextField}
                label="Посилання на зображення"
                variant="outlined"
                onChange={handleChange}
                fullWidth
              />
              <ErrorMessage name="image" component="div" style={{ color: "red" }} />
            </Box>
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
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AddProduct;
