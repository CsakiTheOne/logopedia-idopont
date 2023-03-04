import { useEffect, useState } from 'react';
import { logOut } from '../firebase/auth';
import Page from './Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';

function BookingPage() {

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
        <Typography variant='h5'>Időpont foglalás</Typography>

        <DateCalendar/>

    </Page>;
}

export default BookingPage;
