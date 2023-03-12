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
} from '@mui/material';

function AdminPage() {
    const [aboutUs, setAboutUs] = useState('');

    useEffect(() => {
        getAbout(about => setAboutUs(about));
    }, []);

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
        <Typography variant='h5'>Rólam</Typography>
        <TextField
            variant='filled'
            label='Bemutatkozás és alapinfók'
            value={aboutUs}
            onChange={event => {
                setAboutUs(event.target.value);
                setAbout(event.target.value);
            }}
            multiline
            minRows={3}
        />
        <Typography variant='h5'>Foglalkozások</Typography>
        
        <Typography variant='h5'>Munkanap beállítások</Typography>
        <Card>
            <CardContent>
                <Typography>Munkaidő kezdete:</Typography>
                <Box style={{marginInlineStart: 16, marginInlineEnd: 16}}>
                <Slider
                    marks={[{ value: 6, label: '6:00' }, { value: 10, label: '10:00' }]}
                    min={6}
                    max={10}
                    valueLabelDisplay='auto'
                />
                </Box>
                <Typography>Munkaidő vége:</Typography>
                <Box style={{marginInlineStart: 16, marginInlineEnd: 16}}>
                <Slider
                    marks={[{ value: 14, label: '14:00' }, { value: 20, label: '20:00' }]}
                    min={14}
                    max={20}
                    valueLabelDisplay='auto'
                />
                </Box>
            </CardContent>
        </Card>
    </Page>;
}

export default AdminPage;
