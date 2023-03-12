import { useEffect, useState } from 'react';
import { logOut } from '../../firebase/auth';
import { getAbout, setAbout } from '../../firebase/rtdb';
import Page from '../Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    TextField,
    Slider,
    Card,
    CardContent,
    Box,
    List,
} from '@mui/material';
import React from 'react';
import { getWorks } from '../../firebase/firestore';
import Work from '../../model/Work';
import WorkDisplay from '../../components/WorkDisplay';
import { useParams } from 'react-router-dom';

function EditWorkPage(props: any) {
    const { title } = useParams();

    return <Page
        header={
            <AppBar position='static'>
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }}>Fanni Logopédia - Admin felület</Typography>
                    <Button onClick={() => {
                        logOut();
                    }} color='inherit'>Kijelentkezés</Button>
                </Toolbar>
            </AppBar>
        }
    >
        <Typography variant='h5'>{title}</Typography>

    </Page>;
}

export default EditWorkPage;
