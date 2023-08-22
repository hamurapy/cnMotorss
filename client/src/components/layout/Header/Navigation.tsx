'use client';
import React, { useState, useEffect  } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../Logo';
import Image from 'next/image';
import Link from 'next/link';
import { RootState, useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import { check, logout } from '@/components/screens/auth/auth.slice';
import styles from './menu.module.css'
import { useRouter } from 'next/router'


const pages = [
  {
    id: 1,
    link: '/',
    title: 'Главная',
  },
  {
    id: 2,
    link: '/catalog',
    title: 'Каталог',
  },
  {
    id: 3,
    link: '/about',
    title: 'О нас',
  },
  {
    id: 4,
    link: '/contact',
    title: 'Контакты',
  },
];
const settings = [  {
  id: 1,
  link: '/account',
  title: 'Личный кабинет',
},
{
  id: 2,
  link: '/registration',
  title: 'Регистрация',
},
{
  id: 3,
  link: '/login',
  title: 'Вход',
},
];

function Navigation() {
  const dispatch = useAppDispatch();

  const { user } = useSelector((store: RootState) => store.auth);
  const router = useRouter()

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  const handleLogout = (): void => {
    dispatch(logout());
    router.push('/')
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={styles.nav}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo/>
          <div className={styles.phone}>
            <Image
					    src="/phone.svg"
					    width={25}
              height={25}
					    alt="Продажа авто с пробегом"
					    draggable={false}
				    />
            <Link href="tel: +79215555578">+7 (921) 555-55-78</Link>
          </div>
          <Box sx={{ justifyContent: 'flex-end', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> 
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Link className={styles.menuLink} href={page.link}>{page.title}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ justifyContent: 'flex-end', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Link className={styles.menuLink} href={page.link}>{page.title}</Link>
                </MenuItem>
              ))}
            </Box> 
            {'id' in user ? (
        <div style={{color: 'white'}}>{user.name}{user.email}</div>
      ) : (
        <div style={{color: 'white'}}>121</div>
      )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Личный кабинет">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="CN" src="/favicon.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Link href={setting.link}>{setting.title}</Link>
                </MenuItem>
              ))}
              <button onClick={handleLogout}>Выйти</button>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      </AppBar>
    </div>
  );
}
export default Navigation;