import { useState, useEffect } from 'react';
import { logOut } from '../../firebase/auth';
import Page from '../../components/Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function RentalPage() {
    const navigate = useNavigate();

    useEffect(() => {

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
        <Typography variant='h5'>Kölcsönzés</Typography>

        <Button onClick={() => navigate('/')} variant='contained'>
            Vissza
        </Button>

        

    </Page>;
}

export default RentalPage;
