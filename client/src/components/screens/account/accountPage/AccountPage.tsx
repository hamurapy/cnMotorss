import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "@/components/layout/Logo";
import { RootState, useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { logout } from "../../auth/auth.slice";
import AccountInfo from "../accountInfo/AccountInfo";
import AddCar from "../addCar/AddCar";
import UpdateCar from "../updateCar/UpdateCar";
import Application from "../application/Application";
import Editors from "../editors/Editors";
import { useSelector } from "react-redux";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

function AccountPage(props: Props): JSX.Element {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState(1);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useSelector((store: RootState) => store.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
  };

  const menu = [
    {
      id: 1,
      text: "Аккаунт",
      icon: <PersonIcon />,
    },
    {
      id: 2,
      icon: <PersonAddIcon />,
      text: "Редакторы",
    },
    {
      id: 3,
      icon: <DriveEtaIcon />,
      text: "Заявки",
    },
    {
      id: 4,
      icon: <AddBoxIcon />,
      text: "Добавить авто",
    },
    {
      id: 5,
      icon: <SettingsIcon />,
      text: "Редактировать",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {user.admin
          ? menu.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => handleTabClick(item.id)}
                  className={`${activeTab === item.id ? "active" : ""}`}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))
          : menu
              .map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleTabClick(item.id)}
                    className={`${activeTab === item.id ? "active" : ""}`}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))
              .splice(1, 1)}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Выйти"} onClick={handleLogout} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Logo />
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {activeTab === 1 && <AccountInfo />}
        {user.admin && activeTab === 2 && <Editors />}
        {activeTab === 3 && <Application />}
        {activeTab === 4 && <AddCar />}
        {activeTab === 5 && <UpdateCar />}
      </Box>
    </Box>
  );
}

export default AccountPage;
