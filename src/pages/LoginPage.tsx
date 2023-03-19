import { useState } from 'react';
import { register, logIn, logInGoogle } from '../firebase/auth';
import Page from '../components/Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    TextField,
    Stack,
} from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <Page
        header={
            <AppBar position='static'>
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }}>Fanni Logopédia</Typography>
                </Toolbar>
            </AppBar>
        }
    >
        <TextField variant='filled' label='E-mail' type='email' value={email} onChange={event => setEmail(event.target.value)} />
        <TextField variant='filled' label='Jelszó' type='password' value={password} onChange={event => setPassword(event.target.value)} />
        <Stack direction='row' justifyContent='flex-end' spacing={2}>
            <Button variant='contained' sx={{ flexGrow: 1 }} onClick={() => {
                register(email, password);
            }}>
                Regisztrálás
            </Button>
            <Button variant='contained' sx={{ flexGrow: 1 }} onClick={() => {
                logIn(email, password);
            }}>
                Bejelentkezés
            </Button>
        </Stack>
        <Button variant='contained' color='secondary' onClick={() => {
            logInGoogle();
        }}>Bejelentkezés gyorsan, Google-el</Button>
    </Page>;
}

export default LoginPage;
