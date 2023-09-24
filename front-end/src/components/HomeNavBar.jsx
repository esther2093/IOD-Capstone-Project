import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import { HashLink } from "react-router-hash-link";
import { useUserContext } from "../context/UserContext";

const sections = [
  { link: "/#banner-top", label: "HOME" },
  { link: "/#about-top", label: "ABOUT" },
  { link: "/#services-top", label: "SERVICES" },
];

const pages = [
  { link: "/rides/", label: "SEND" },
  { link: "/drive/", label: "DRIVE" },
];

const settings = [
  { link: "/login/", label: "LOGIN" },
  { link: "/myaccount/", label: "ACCOUNT" },
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { currentUser, handleUpdateUser } = useUserContext();
  const [loggedIn, setLoggedIn] = React.useState(currentUser.firstName);

  const handleLogout = () => {
    handleUpdateUser({});
    setLoggedIn(false);
  };
  
  const [isSticky, setIsSticky] = React.useState(false);
  const [isTransparent, setIsTransparent] = React.useState(true);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsSticky(scrollY >= 400);
    setIsTransparent(scrollY <= 400);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClass = isSticky
    ? `navbar sticky navbar-slide-down` 
    : isTransparent
    ? "navbar transparent" 
    : "navbar";

  React.useEffect(() => {
    if (isSticky) {
      const navbar = document.querySelector(".navbar");
      navbar.style.transition = "transform 0.5s ease-in-out";
      navbar.style.transform = "translateY(0)";
    }
  }, [isSticky]);

  return (
    <AppBar
      position={isSticky ? "fixed" : "static"}
      color="secondary"
      className={navClass}
      sx={{width: "100%"}}
    >
      <Container maxWidth="false" >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            className="navbar-logo"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1.5em",
              letterSpacing: "-0.1em",
              marginRight: "2rem",
            }}
          >
            PARCELME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {sections.map((page) => (
                <Button
                  key={page.link}
                  component={HashLink}
                  smooth
                  to={page.link}
                  sx={{
                    display: { xs: "block", md: "none" },
                    fontWeight: 400,
                    lineHeight: 1.5,
                    minHeight: "48px",
                    paddingTop: 0.75,
                    paddingBottom: 0.75,
                    paddingLeft: 2,
                    paddingRight: 2,
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {page.label}
                </Button>
              ))}
                {pages.map((page) => (
                <Button
                  key={page.link}
                  component={NavLink}
                  to={page.link}
                >
                  {page.label}
                </Button>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.5em",
              letterSpacing: "-0.1em",
              marginRight: "2rem",
            }}
          >
            PARCELME
          </Typography>

          <Box
            className="nav-links"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {sections.map((page) => (
              <Button
                key={page.link}
                component={HashLink}
                smooth
                to={page.link}
              >
                {page.label}
              </Button>
            ))}
              {pages.map((page) => (
                <Button
                  key={page.link}
                  component={NavLink}
                  to={page.link}
                >
                  {page.label}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account Information" placement="left">
              <Icon
                icon="fa-regular:user"
                height="20"
                className="user-icon"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              />
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.link}
                  component={NavLink}
                  to={setting.link}
                  onClick={handleCloseUserMenu}
                  sx={{ fontSize: "0.875em" }}
                >
                  {setting.label}
                </MenuItem>
              ))}
              <MenuItem
                  onClick={handleLogout}
                  sx={{ fontSize: "0.875em" }}
                  className="logout-menu-button"
                >
                  LOG OUT
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
