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

function MainPage() {
    const [aboutUs, setAboutUs] = useState('');
    const [worksMenuOpen, setWorksMenuOpen] = useState(null);

    useEffect(() => {
        getAbout(about => setAboutUs(about));
    }, []);

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
            Új foglalkozás kérése
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
        <MenuItem onClick={() => { setWorksMenuOpen(null); }}>temp_work_a</MenuItem>
        <MenuItem onClick={() => { setWorksMenuOpen(null); }}>temp_work_b</MenuItem>
        <MenuItem onClick={() => { setWorksMenuOpen(null); }}>temp_work_c</MenuItem>
      </Menu>
    </Page>;
}

export default MainPage;
