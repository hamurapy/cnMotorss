"use client";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { check, logout } from "@/components/screens/auth/auth.slice";
import styles from "./menu.module.css";
import PhoneIcon from "../PhoneIcon";

const pages = [
  {
    id: 1,
    link: "/",
    title: "Главная",
  },
  {
    id: 2,
    link: "/catalog",
    title: "Каталог",
  },
  {
    id: 3,
    link: "/about",
    title: "О нас",
  },
  {
    id: 4,
    link: "/contact",
    title: "Контакты",
  },
];

function Navigation() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { admin } = useSelector((store: RootState) => store.auth.user);

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
  };

  const isActive = (href) => {
    return router.pathname === href ? "active" : "";
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
            <div className={styles.logoBlock}>
              <Logo />
            </div>
            <div className={styles.phone}>
              <PhoneIcon />
              <Link className={styles.phoneLink} href="tel: +79215555578">
                +7 (921) 555-55-78
              </Link>
            </div>
            <Box
              sx={{
                justifyContent: "flex-end",
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.id}
                    onClick={handleCloseNavMenu}
                    className={isActive(page.link)}
                  >
                    <Link className={styles.menuLink} href={page.link}>
                      {page.title}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                justifyContent: "flex-end",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  className={isActive(page.link)}
                >
                  <Link className={styles.menuLink} href={page.link}>
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Box>
            {admin ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Личный кабинет">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="CN" src="/favicon.png" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Link className={styles.accountBtn} href="/account">
                      Личный кабинет
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className={styles.accountBtn}
                      onClick={handleLogout}
                    >
                      Выйти
                    </button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <></>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navigation;
