import { Link } from "react-router";

function Footer() {
  return (
    <footer style={{ background: "#212529", color: "#f8f9fa", padding: "30px 40px", marginTop: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

        <div style={{ maxWidth: "250px" }}>
          <h2 style={{ margin: 0, color: "#0d6efd" }}>MyShop</h2>
          <p style={{ fontSize: "14px", color: "#ced4da" }}>
            Ваш надійний інтернет-магазин електроніки, побутової техніки та товарів для дому.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: "10px" }}>Навігація</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/" style={{ textDecoration: "none", color: "#f8f9fa" }}>Головна</Link></li>
            <li><Link to="/categories" style={{ textDecoration: "none", color: "#f8f9fa" }}>Категорії</Link></li>
            <li><Link to="/products" style={{ textDecoration: "none", color: "#f8f9fa" }}>Товари</Link></li>
            <li><Link to="/weather" style={{ textDecoration: "none", color: "#f8f9fa" }}>Погода</Link></li>
            <li><Link to="/login" style={{ textDecoration: "none", color: "#f8f9fa" }}>Логін/Реєстрація</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: "10px" }}>Контакти</h4>
          <p style={{ margin: "4px 0" }}>📍 Рівне, Україна</p>
          <p style={{ margin: "4px 0" }}>📞 +380 98 123 4567</p>
          <p style={{ margin: "4px 0" }}>✉ support@myshop.com</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#adb5bd" }}>
        © {new Date().getFullYear()} MyShop. Усі права захищені.
      </div>
    </footer>
  );
}

export default Footer;
