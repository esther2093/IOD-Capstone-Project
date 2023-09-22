import * as React from "react";
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

const pages = [
  { link: "/", label: "HOME" },
  { link: "/Send/", label: "SEND" },
  { link: "/Drive/", label: "DRIVE" },
];

const settings = [
  { link: "/login/", label: "LOGIN" },
  { link: "/a/", label: "ACCOUNT" },
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

  return (
    <AppBar position="sticky" color="secondary">
      <Container maxWidth="xl">
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
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
