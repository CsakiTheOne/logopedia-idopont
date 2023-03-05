import { useEffect, useState } from 'react';
import { logOut } from '../firebase/auth';
import { getAbout } from '../firebase/rtdb';
import Page from './Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    const [aboutUs, setAboutUs] = useState('');
    const [worksMenuOpen, setWorksMenuOpen] = useState(null);

    useEffect(() => {
        getAbout(about => setAboutUs(about));
    }, []);

    function handleWorkClick(event) {
        setWorksMenuOpen(null);
        navigate('/booking');
    }

    return <Page
        header={
            <AppBar position='static'>
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }}>Fanni Logopédia</Typography>
                    <Button onClick={() => {
                        logOut();
                    }} color='inherit'>Kijelentkezés</Button>
                </Toolbar>
            </AppBar>
        }
    >
        <Typography variant='h5'>Fanniról</Typography>
        <p>{aboutUs}</p>
        <Typography variant='h5'>Foglalkozásaim</Typography>
        <Button onClick={event => { setWorksMenuOpen(event.target); }} variant='contained' startIcon={<AddIcon/>}>
            Új foglalkozás időpont kérése
        </Button>
        <Menu
        id="basic-menu"
        anchorEl={worksMenuOpen}
        open={worksMenuOpen}
        onClose={() => { setWorksMenuOpen(null); }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* TODO replace with works from the database */}
        <MenuItem onClick={handleWorkClick}>temp_work_a</MenuItem>
        <MenuItem onClick={handleWorkClick}>temp_work_b</MenuItem>
        <MenuItem onClick={handleWorkClick}>temp_work_c</MenuItem>
      </Menu>
    </Page>;
}

export default MainPage;
