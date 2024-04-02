import {useState} from 'react';
import logo from './logo.svg'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import NamedAvatar from './Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from './AuthProvider';

function refreshPage(){ 
    window.location.reload(); 
}

export default function MenuBar() {
    const { authenticated, username, logout } = useAuth();
    const pages = ['Posts'];

    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNav = (event) => {
        if (event.currentTarget.textContent === "Posts") {
            refreshPage();
        }
    };

    const handleLogout = () => {
        logout();
        // refreshPage();
    };

    return (
    <AppBar position="fixed">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 0 }} style={{marginRight: 10}} >
                    <img src={logo} alt="Y" style={{ height: 40, marginRight: 10}} />
                </Box>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleOpenNav}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 1 }}/>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title={authenticated ? "@" + username : "Login"}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {authenticated 
                             ? <NamedAvatar alt={username} name={username}/>
                             : null
                            }
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
                        {authenticated 
                        ? (
                        <MenuItem key="Logout" onClick={handleLogout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                        )
                        : null
                        }
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    )
}