import { useEffect, useState } from 'react';
import { logOut } from '../../firebase/auth';
import { getAbout } from '../../firebase/rtdb';
import Page from '../../components/Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function MainPage() {
    const navigate = useNavigate();
    const [aboutUs, setAboutUs] = useState('');

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
        <Button onClick={() => navigate('/booking')} variant='contained' startIcon={<AddIcon />}>
            Új foglalkozás időpont kérése
        </Button>
    </Page>;
}

export default MainPage;
