import { useState, useEffect } from "react";
import { Typography, Grid, Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryCard from "../../components/cards/CategoryCard";
import { Link } from "react-router";
const data = [
  {
    id: 1,
    name: 'Електроніка',
    description: 'Смартфони, ноутбуки, телевізори та інші електронні пристрої.',
    image: 'https://vmtehnika.com.ua/uploads/main_slider_galleries/35/36/w702_fbfg8tngi_88e9dc82.png'},
  {id: 2,
    name: 'Одяг',
    description: 'Чоловічий, жіночий та дитячий одяг для будь-якого сезону.',
    image: 'https://cdn.kasta.ua/imgw/loc/0x0/s3/uploads/landing_images/2025/08/258/8be91827e70b48998b1c3ca21f9d9990.png'},
  {id: 3,
    name: 'Домашні товари',
    description: 'Меблі, декор, кухонне приладдя та інші товари для дому.',
    image: 'https://images.avrora.ua/images/companies/1/blog/kuhonne-priladdya-top-10-predmetiv/kuhonne-priladdya-top-10-predmetiv-neobhidnih-na-kuhni-1.png?1695402772351'},
  {id: 4,
    name: 'Краса та здоров\'я',
    description: 'Косметика, засоби догляду за шкірою та здоров\'ям.',
    image: 'https://cosmeticus.com.ua/files/resized/blog/najkraschij-doglyad-za-problemnoyu-shkiroyu.1100x800.jpg'},
    {id: 5,
    name: 'Спорт та відпочинок',
    description: 'Спортивне обладнання, одяг для активного відпочинку та туризму.',
    image: 'https://static.insalescdn.com/images/collections/1/7941/2162437/1581414884_w640_h640_otdyh-i-sport_1_.jpg'},
    {id: 6,
    name: 'Дитячі товари',
    description: 'Іграшки, одяг та аксесуари для дітей різного віку.',
    image: 'https://zadavaka.net/content/uploads/images/top-igryshek-dlya-detey.jpg'},
    {id: 7,
    name: 'Автотовари',
    description: 'Запчастини, аксесуари та засоби догляду за автомобілем.', 
    image: 'https://moto-lux.com.ua/content/uploads/images/ecbb4dcde1.jpg'}
]

const CategoryListPage = () => {
    const [categories, setCategories] = useState(data);


    useEffect(() => {
        const localData = localStorage.getItem("categories");
        if (localData) {
            setCategories(JSON.parse(localData));
        } else {
            setCategories(data);
            localStorage.setItem("categories", JSON.stringify(data));
        }
    }, []);

    const handleDelete = (name) => {
        const newCategories = categories.filter(c => c.name !== name);
        setCategories(newCategories);
        localStorage.setItem("categories", JSON.stringify(newCategories));
    }

    return (
        <>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
                Категорії
            </Typography>
            <Grid container spacing={1} mx={3} mt={5} mb={2}>
                {categories.map((category, index) => (
                    <Grid key={index} size={3}>
                        <CategoryCard category={category} deleteCallback={handleDelete} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ textAlign: "end", mb: 2, mx: 4 }}>
                <Link to="create">
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Box>
        </>
    );
};

export default CategoryListPage;