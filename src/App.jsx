import './App.css';
import Navbar from './components/Navbar/Navbar';
import CategoryListPage from './pages/category/CategoryListPage.jsx';
import GoodsListPage from './pages/goods/GoodsListPage.jsx';

function App() {
  return (
    <>
      <Navbar />
      {/* <CategoryListPage /> */}
      <GoodsListPage />
    </>
  )
}

export default App

