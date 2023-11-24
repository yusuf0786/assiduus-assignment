import React, { useImperativeHandle } from 'react'
import { Link, NavLink } from "react-router-dom"
import { useState, useRef, useEffect, useId } from 'react'
import { ListItemText, ListItemIcon, ListItemButton, ListItem, List, Drawer, InputBase, Container, Toolbar, Tooltip, AppBar, Button, IconButton, Badge, ClickAwayListener, Menu, MenuItem, Avatar, Box, Typography, Collapse  } from "@mui/material";

import logo from "../../assets/img/logo.png"
import avatarImg from "../../assets/img/myimg.png"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

// drawe icons import
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';

import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const settings = ['Profile', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(245, 245, 245, 1)",
    '&:hover': {
        backgroundColor: "rgba(245, 245, 245, 1)",
    },
    color: "#5f5f5f",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

const drawerItemsDetails = [
    {text: "Dashboard", path: "/", icon: <DashboardIcon />},
    {text: "Accounts", path: "/accounts", icon: <AccountBalanceWalletIcon />},
    {text: "Payroll", path: "/payroll", icon: <AttachMoneyIcon />},
    {text: "Reports", path: "/reports", icon: <SummarizeIcon />},
    {text: "Advisor", path: "/advisor", icon: <PersonIcon />},
    {text: "Contacts", path: "/contacts", icon: <ContactsIcon />},
]

const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    boxShadow: 0,
    [`& .MuiPaper-root`]: { 
        width: drawerWidth, 
        boxSizing: 'border-box',
        // transform: "translate(0%, 0%) !important",
        transitionProperty: "transform",
        transitionDuration: "0.5s",
        // "@media only screen and (max-width:900px)": {
        //     transform: "translate(100%, 0%) !important",
        //     ...(open && { 
        //         transform: "translate(0%, 0%) !important",
        //     }),
        // },
    },
    ".MuiPaper-root": {
        border: 0,
    },
}

function Header(props, ref) {

    const randomBtnItemId = useId()
    const searchItemId = useId()
    const actionItemId = useId()
    const userMenuItemId = useId()
    const userMenuListId = useId()

    const [open, setOpen] = useState(true)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openCollapse, setOpenCollapse] = useState(false);
  
    const handleOpenNavMenu = (event) => {
        setOpen(true)
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
        setOpen(false)
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleCollapseMenu = () => {
        setOpenCollapse(!openCollapse);
    };

    useEffect(() => {
        function resizeHandler() {
            setWindowWidth(window.innerWidth)
            if(windowWidth <= 900) { setOpen(false) }
        }
        window.addEventListener("resize", resizeHandler)

        setOpen(windowWidth <= 900 ? false : true)

        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    }, []) // empty dependancy array runs it once after react rendered

    return (
        <>
            {/* header Starts */}
            <AppBar position='static' sx={{backgroundColor: "#fff", boxShadow: 1, zIndex: 1}}>
                <Container maxWidth="100%">
                    <Toolbar disableGutters sx={{display:"flex", justifyContent:"flex-end",}}>

                        <Box display={{xs: "none", md:"flex"}} alignItems="center">

                            <Button variant="outlined" onClick={props.chartDataupdateFunction} sx={{marginRight:3, display: {xs: "none", md:"block"}}}>Random Data</Button>
                            
                            <Search sx={{margin:"0 !important"}}>
                                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                                <StyledInputBase
                                    // placeholder="Search…"
                                    type='text'
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                            <Box sx={{ color: '#000', paddingTop: "10px" }} mx={3}>
                                <Badge color="notificationBadgeColor" variant="dot">
                                    <NotificationsIcon />
                                </Badge>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton disableRipple onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={avatarImg} alt="Avatar Image" sx={{marginRight:"1rem"}}/>
                                        <ArrowDropDownIcon/>
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                                </Menu>
                            </Box>
                        </Box>
                        <Box display={{xs: "flex", md:"none"}} justifyContent="space-between" alignItems="center" width="100%">
                            <Box className="logo">
                                <img src={logo} alt="Logo" />
                            </Box>
                            <IconButton
                                color="#000"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleOpenNavMenu}
                                sx={{ ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
                {/* Drawer AKA sidebar */}
                <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleCloseNavMenu}>
                    <Drawer open={open} variant={ windowWidth <= 900 ? "temporary" : "permanent"} onClose={() => setOpen(false)} anchor={windowWidth > 900 ? "left" : "right"} sx={drawerStyle}>
                        <Toolbar>
                            <Box className="logo" display={{xs: "none", md: "block"}}>
                                <img src={logo} alt="Logo" />
                            </Box>
                            <Box className="close-btn" display={{xs: "block", md: "none"}}>
                                <IconButton color="#000" aria-label="close drawer" edge="end" onClick={handleCloseNavMenu} sx={{ ...(!open && { display: 'none' }) }} >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                        <Box sx={{ overflow: 'auto' }}>
                            <List sx={{display: {xs:"block", md:"none"}, }}>
                                <ListItem key={randomBtnItemId} disablePadding sx={{padding: "8px 1.75rem"}}>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        onClick={ () => {
                                            props.chartDataupdateFunction()
                                            handleCloseNavMenu()
                                        }} 
                                        sx={{display: {xs: "block", md:"none"}}}>Random Data</Button>
                                </ListItem>
                                <ListItem key={searchItemId} disablePadding sx={{padding: "8px 1.75rem"}}>
                                    <Search sx={{margin:"0 !important", width:"100% !important"}}>
                                        <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                                        <StyledInputBase type='text' inputProps={{ 'aria-label': 'search' }} />
                                    </Search>
                                </ListItem>
                                <ListItem key={actionItemId} disablePadding sx={{display: "flex", justifyContent: "space-between"}}>
                                        <ListItemButton sx={{padding: "8px 1.75rem"}} >
                                            <ListItemIcon>
                                                <Badge color="notificationBadgeColor" variant="dot">
                                                    <NotificationsIcon />
                                                </Badge>
                                            </ListItemIcon>
                                            <ListItemText primary="Some Actions" />
                                        </ListItemButton>
                                </ListItem>
                                <ListItem key={userMenuItemId} disablePadding>
                                    <ListItemButton sx={{padding: "8px 1.75rem"}} >
                                        <ListItemIcon>
                                            <IconButton disableRipple onClick={handleCollapseMenu} sx={{ p: 0, width: "100%" }}>
                                                <Avatar src={avatarImg} alt="Avatar Image" sx={{marginRight:"1rem"}}/>
                                                <ListItemText sx={{textAlign:"left"}} primary="User Settings" />
                                                <ArrowDropDownIcon/>
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={openCollapse} onClose={handleCollapseMenu} timeout="auto" unmountOnExit  sx={{display: {xs:"block", md:"none"}, }}>
                                    <List component="div">
                                        {settings.map((setting, index) => (
                                            <ListItem key={userMenuListId + index} disablePadding>
                                                <ListItemButton sx={{padding: "8px 1.75rem"}}>
                                                    <ListItemText primary={setting} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </List>
                            <List sx={{padding: {xs: 0, md: "2.38rem 0 0 0"}, }}>
                                {drawerItemsDetails.map((itemDetail, index) => (
                                <ListItem key={itemDetail.text} disablePadding>
                                    <NavLink to={itemDetail.path} onClick={ windowWidth <= 900 ? handleCloseNavMenu : null } className="drawer-nav-link">
                                        <ListItemButton sx={{padding: "8px 1.75rem"}} >
                                            <ListItemIcon>
                                                {itemDetail.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={itemDetail.text} />
                                        </ListItemButton>
                                    </NavLink>
                                </ListItem>
                                ))}
                            </List>
                            {/* <Divider /> */}
                        </Box>
                    </Drawer>
                </ClickAwayListener>
            </AppBar>
        </>
    )
}

// avatar popup code
const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
200: '#99CCFF',
300: '#66B2FF',
400: '#3399FF',
500: '#007FFF',
600: '#0072E5',
700: '#0066CC',
};

export default React.forwardRef(Header);