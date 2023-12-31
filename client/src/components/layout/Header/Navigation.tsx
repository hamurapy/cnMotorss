"use client";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { check, logout } from "@/components/screens/auth/auth.slice";
import styles from "./menu.module.css";
import PhoneNumber from "@/components/screens/phoneNumber/PhoneNumber";
import { CSSTransition } from "react-transition-group";

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

function Navigation(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const { user } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
  };

  const isActive = (href: string) => {
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

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={styles.nav}>
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div className={styles.logoBlock}>
              <Logo />
            </div>
            <div className={styles.phone}>
              <LocalPhoneIcon sx={{ fontSize: 30 }} />
              <PhoneNumber />
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
            {user.name ? (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  onClick={handleShow}
                  sx={{ p: 0 }}
                  style={{ border: "1px" }}
                >
                  <Avatar alt="CN" src="/favicon.png" />
                </IconButton>
                <CSSTransition
                  in={show}
                  timeout={500}
                  className="accountNav"
                  unmountOnExit
                >
                  <div className="accountNav">
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
                  </div>
                </CSSTransition>
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
