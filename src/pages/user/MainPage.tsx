import { useEffect, useState } from 'react';
import { addOnAuthStateChangedListener, logOut } from '../../firebase/auth';
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
import { User } from 'firebase/auth';
import LoginCard from '../../components/LoginCard';
import banner from '../../media/banner.png';

function MainPage() {
    const navigate = useNavigate();
    const [aboutUs, setAboutUs] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        getAbout(about => setAboutUs(about));

        function onAuthChanged(user: User | null) {
            setIsLoggedIn(!!user);
        }

        addOnAuthStateChangedListener(onAuthChanged);
    }, []);

    return <Page
        header={
            <>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography sx={{ flexGrow: 1 }}>Fanni Logopédia</Typography>
                        {
                            isLoggedIn ?
                                <Button onClick={() => {
                                    logOut();
                                }} color='inherit'>
                                    Kijelentkezés
                                </Button> : <></>
                        }

                    </Toolbar>
                </AppBar>
                <img
                    style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
                    src={banner}
                    alt='Fanni Logopédia'
                />
            </>
        }
    >
        <p>{aboutUs}</p>
        {
            isLoggedIn ?
                <>
                    <Typography variant='h5'>Foglalkozásaim</Typography>
                    <Button onClick={() => navigate('/booking')} variant='contained' startIcon={<AddIcon />}>
                        Új foglalkozás időpont kérése
                    </Button>
                </> :
                <>
                    <LoginCard />
                </>

        }

    </Page>;
}

export default MainPage;
