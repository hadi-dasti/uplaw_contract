import * as React from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "../styles/styled";
import {
  ShoppingCart,
  AccountCircle,
  SearchRounded,
  MenuRounded,
  Login,
  Logout,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

// import { useSignOut, useUser } from "../hooks/user";
// import { useRouter } from "next/router";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  //   const signOut = useSignOut();
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          //   signOut();
          handleMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show" color="inherit">
          <Logout />
        </IconButton>
        Log Out
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          //   signOut();
          handleMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show" color="inherit">
          <Logout />
        </IconButton>
        <p>LogOut</p>
      </MenuItem>
    </Menu>
  );
  //   const user = useUser();
  //   const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuRounded />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/">Uplaw Contract</Link>
          </Typography>
          <Typography
            variant="body1"
            // color={router.pathname === "/about" ? "yellow" : null}
            noWrap
            component="div"
            sx={{ ml: 10, display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Link href="/about">About</Link>
          </Typography>
          {/* <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ ml: 2, display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Link href="/about">Blog</Link>
          </Typography> */}
          <Typography
            variant="body1"
            // color={router.pathname === "/contact" ? "yellow" : null}
            noWrap
            component="div"
            sx={{
              ml: 2,
              mr: 10,
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            <Link href="/contact">Contact</Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchRounded />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* {user ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar>{user.name[0]}</Avatar>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new"
                  color="inherit"
                >
                  <Link href="/cart">
                    <Badge badgeContent={17} color="error">
                      <ShoppingCart />
                    </Badge>
                  </Link>
                </IconButton>
              </>
            ) : (    */}
            <Link to="/login" style={{ display: "flex", alignItems: "center" }}>
              <Login sx={{ mr: 0.5, fontSize: 30 }} />
              <Typography variant="button" sx={{}}>
                LogIn
              </Typography>
            </Link>
            {/* )} */}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {/* {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <Avatar>{user.name[0]}</Avatar>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new"
                  color="inherit"
                >
                  <Link href="/cart">
                    <Badge badgeContent={17} color="error">
                      <ShoppingCart />
                    </Badge>
                  </Link>
                </IconButton>
              </>
            ) : ( */}
            <Link href="/sign-in">
              <Login sx={{ mr: 0.5, fontSize: 30 }} />
              <Typography variant="caption">LogIn</Typography>
            </Link>
            {/* )} */}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
