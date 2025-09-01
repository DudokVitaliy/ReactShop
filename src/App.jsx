import './App.css';
import Navbar from './components/Navbar/Navbar';
import CategoryListPage from './pages/category/CategoryListPage.jsx';
import GoodsListPage from './pages/goods/GoodsListPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import LoginPageHW from './pages/login/LoginPageHW.jsx';

function App() {
  return (
    <>
      <Navbar />
      {/* <LoginPage /> */}
      <LoginPageHW />
      {/* <CategoryListPage /> */}
      {/* <GoodsListPage /> */}
    </>
  )
}

export default App

