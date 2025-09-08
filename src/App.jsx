import './App.css';
import CategoryListPage from './pages/category/CategoryListPage.jsx';
import GoodsListPage from './pages/goods/GoodsListPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import LoginPageHW from './pages/login/LoginPageHW.jsx';
import { Routes, Route} from 'react-router';
import NotFoundPage from './pages/NotFoundPage/NotFound.jsx';
import AddProduct from './pages/AddProduct/AddProduct.jsx';
import CategoryCreatePage from './pages/category/CategoryCreatePage.jsx';
import CategoryUpdatePage from './pages/category/CategoryUpdatePage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import DefaultLayouts from './components/layouts/DefaultLayouts.jsx';
import UpdateProduct from './pages/goods/UpdateProduct.jsx';
import WeatherPage from './pages/WeatherPage/WeatherPage.jsx';
import { useAuth } from './features/context/AuthContex.jsx';
import { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'

function App() {

  const { login, googleLogin } = useAuth();

  useEffect(() => {
        const authData = localStorage.getItem("auth");
        const googleData = localStorage.getItem("googleAuth");

        if (authData) {
            dispatch({ type: "LOGIN", payload: JSON.parse(authData) });
            return;
        }
        if (googleData) {
            googleLogin(JSON.parse(googleData));
        }
    }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayouts/>}>
          <Route index element={<HomePage/>}/>
              <Route path='/categories'>
                <Route index element={<CategoryListPage/>}/>
                <Route path='create' element={<CategoryCreatePage/>}/>
                <Route path='edit/:name' element={<CategoryUpdatePage/>}/>
              </Route>
              
              <Route path='/products'>
                <Route index element={<GoodsListPage/>}/>
                <Route path='create' element={<AddProduct/>}/>
                <Route path='edit/:name' element={<UpdateProduct/>}/>
              </Route>

              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<LoginPageHW/>}/>
              <Route path='/weather' element={<WeatherPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
    
  )
}

export default App

