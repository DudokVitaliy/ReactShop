import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../features/context/AuthContex.jsx';
import { styled, useTheme } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { colors } from '@mui/material';
import { useCart } from '../../features/context/CartContext.jsx';

const pages = [
  { name: 'Головна', path: '/' },
  { name: 'Категорії', path: '/categories' },
  { name: 'Товари', path: '/products' },
  { name: 'Погода', path: '/weather' }
];

const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
        top: -12px;
        right: -6px;
    }
`;

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const {cartCount} = useCart();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, color: "white", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
              }}
            >
              LOGO
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Link key={page.name} to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.path} style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleCloseNavMenu}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.firstName || 'User'}
                      src={user.avatar || "https://i.pinimg.com/236x/63/1d/0c/631d0c92248b6a26393732d625c91e1c.jpg"}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/profile");
                    }}
                  >
                    <Typography textAlign="center">Профіль</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      logout();
                      navigate("/login");
                    }}
                  >
                    <Typography textAlign="center">Вийти</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary" sx={{ m: 1 }}>Увійти</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary" sx={{ m: 1 }}>Зареєструватися</Button>
                </Link>
              </>
            )}
          </Box>
          <Link to={"/cart"}>
            <Box>
            <IconButton sx={{ ml: 2 }}>
              <ShoppingCartIcon
              sx={{color:"white"}}
              color="white"
              fontSize="small"
            />
            <CartBadge
              sx={{color: "white"}}
              color="error"
              badgeContent={cartCount()}
              overlap="circular"
            />
            </IconButton>
            </Box>
          </Link>
           
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
