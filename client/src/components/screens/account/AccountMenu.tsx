import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./accountmenu.module.css";
import { RootState, useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { logout } from "../auth/auth.slice";
import { useSelector } from "react-redux";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

function AccountMenu(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.auth);

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
  };

  const handleMenuOpen = (): void => {
    setOpen((prev) => !prev);
    setMenu("0");
  };

  const handleMenuClose = (): void => {
    setOpen((prev) => !prev);
    setMenu("-60%");
  };

  const isActive = (href: string) => {
    return router.pathname === href ? "activeBtn" : "";
  };

  return (
    <>
      {open ? (
        <div
          className={styles.accountmenuIcon}
          onClick={handleMenuClose}
          style={{ left: "60%" }}
        >
          <CloseIcon />
        </div>
      ) : (
        <div
          className={styles.accountmenuIcon}
          onClick={handleMenuOpen}
          style={{ left: "0" }}
        >
          <MenuOpenIcon />
        </div>
      )}

      <div className={styles.accountmenu} style={{ left: menu }}>
        <Link href="/account" className="activeBtn">
          <PersonIcon /> Аккаунт
        </Link>
        {user.admin && (
          <Link href="/editors" className={isActive("/editors")}>
            <PersonAddIcon /> Редакторы
          </Link>
        )}
        <Link href="/application" className={isActive("/application")}>
          <DriveEtaIcon /> Заявки
        </Link>
        <Link href="/add-car" className={isActive("/add-car")}>
          <AddBoxIcon /> Добавить авто
        </Link>
        <Link href="/edit-car" className={isActive("/edit-car")}>
          <SettingsIcon /> Редактировать
        </Link>
        <hr />
        <Link href="/" onClick={handleLogout}>
          <LogoutIcon /> Выйти
        </Link>
      </div>
    </>
  );
}

export default AccountMenu;
