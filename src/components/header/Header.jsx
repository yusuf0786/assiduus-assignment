import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { useState, useRef, useEffect, useId } from 'react'
import { ListItemText, ListItemIcon, ListItemButton, ListItem, List, Drawer, InputBase, Container, Toolbar, Tooltip, AppBar, IconButton, Badge, ClickAwayListener, Menu, MenuItem, Avatar, Box, Typography } from "@mui/material";
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

import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { alpha, styled } from '@mui/material/styles';

const drawerWidth = 240;

const pages = ['Products', 'Pricing', 'Blog'];
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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const drawerItemsDetails = [
    {text: "Dashboard", path: "/", icon: <DashboardIcon />},
    {text: "Accounts", path: "/accounts", icon: <AccountBalanceWalletIcon />},
    {text: "Payroll", path: "/payroll", icon: <AttachMoneyIcon />},
    {text: "Reports", path: "/reports", icon: <SummarizeIcon />},
    {text: "Advisor", path: "/advisor", icon: <PersonIcon />},
    {text: "Contacts", path: "/contacts", icon: <ContactsIcon />},
]

export function Header() {

    const searchItemId = useId()
    const actionItemId = useId()
    const userMenuItemId = useId()

    const [open, setOpen] = useState(true)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const [anchorElUser, setAnchorElUser] = useState(null);
  
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

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)

            if(windowWidth <= 900) {
                setOpen(false)
            }
        })
        setOpen(windowWidth <= 900 ? false : true)
    }, []) // empty dependancy array runs it once after react rendered

    return (
        <>
            <AppBar position='static' sx={{backgroundColor: "#fff", boxShadow: 1, zIndex: 1}}>
                <Container maxWidth="100%">
                    <Toolbar disableGutters sx={{display:"flex", justifyContent:"flex-end",}}>

                        <Box display={{xs: "none", md:"flex"}} alignItems="center">
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
                <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleCloseNavMenu}>
                    <Drawer
                        open={open}
                        variant="permanent"
                        anchor={windowWidth > 900 ? "left" : "right"}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            boxShadow: 0,
                            [`& .MuiDrawer-paper`]: { 
                                width: drawerWidth, 
                                boxSizing: 'border-box',
                                transform: "translate(0%, 0%) !important",
                                transitionProperty: "transform",
                                transitionDuration: "0.5s",
                                "@media only screen and (max-width:900px)": {
                                    ...(!open && { 
                                        transform: "translate(100%, 0%) !important",
                                    }),
                                },
                            },
                            ".MuiPaper-root": {
                                border: 0,
                            },
                        }}
                    >
                        <Toolbar>
                            <Box className="logo" display={{xs: "none", md: "block"}}>
                                <img src={logo} alt="Logo" />
                            </Box>
                            <Box className="close-btn" display={{xs: "block", md: "none"}}>
                                <IconButton
                                    color="#000"
                                    aria-label="close drawer"
                                    edge="end"
                                    onClick={handleCloseNavMenu}
                                    sx={{ ...(!open && { display: 'none' }) }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                        <Box sx={{ overflow: 'auto' }}>
                            <List sx={{display: {xs:"block", md:"none"}, }}>
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
                                            <Tooltip title="Open settings">
                                                <IconButton disableRipple onClick={handleOpenUserMenu} sx={{ p: 0, width: "100%" }}>
                                                    <Avatar src={avatarImg} alt="Avatar Image" sx={{marginRight:"1rem"}}/>
                                                    <ListItemText sx={{textAlign:"left"}} primary="User Settings" />
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
                                        </ListItemButton>
                                </ListItem>
                            </List>
                            <List sx={{padding: {xs: 0, md: "1.25rem 0 0 0"}, }}>
                                {drawerItemsDetails.map((itemDetail, index) => (
                                <ListItem key={itemDetail.text} disablePadding>
                                    <NavLink to={itemDetail.path} className="drawer-nav-link">
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

const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
    box-shadow: ${
        theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
    `,
);

const customButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[500]};
    box-shadow: 0 2px 1px ${
        theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

    &:hover {
        background-color: ${blue[600]};
    }

    &:active {
        background-color: ${blue[700]};
        box-shadow: none;
    }

    &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
    }

    &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: none;
        &:hover {
        background-color: ${blue[500]};
        }
    }
    `,
);