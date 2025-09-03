import './App.css';
import Navbar from './components/Navbar/Navbar';
import CategoryListPage from './pages/category/CategoryListPage.jsx';
import GoodsListPage from './pages/goods/GoodsListPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import LoginPageHW from './pages/login/LoginPageHW.jsx';
import { Routes, Route} from 'react-router';
import NotFoundPage from './pages/NotFoundPage/NotFound.jsx';
import AddProduct from './pages/AddProduct/AddProduct.jsx';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<CategoryListPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<LoginPageHW/>}/>
        <Route path='/products' element={<GoodsListPage/>}/>
        <Route path="/add" element={<AddProduct />} />
        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </>
    
  )
}

export default App

