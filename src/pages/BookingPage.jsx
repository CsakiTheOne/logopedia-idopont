import { useEffect, useState } from 'react';
import { logOut } from '../firebase/auth';
import Page from './Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { Navigate, useNavigate } from 'react-router-dom';

function BookingPage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

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

        <Stepper activeStep={activeStep} orientation='vertical'>
            <Step>
                <StepLabel>Foglalkozás</StepLabel>
                <StepContent>
                    <Typography>Választott foglalkozás:</Typography>
                    <Button
                        variant="contained"
                        onClick={() => { navigate('/'); }}
                    >
                        Vissza
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { setActiveStep(activeStep + 1); }}
                    >
                        Tovább
                    </Button>
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Nap</StepLabel>
                <StepContent>
                    <DateCalendar />
                    <Button
                        variant="contained"
                        onClick={() => { setActiveStep(activeStep - 1); }}
                    >
                        Vissza
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { setActiveStep(activeStep + 1); }}
                    >
                        Tovább
                    </Button>
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Idő</StepLabel>
                <StepContent>
                    <Typography>Szabad időpontok helye itt.</Typography>
                    <Button
                        variant="contained"
                        onClick={() => { setActiveStep(activeStep - 1); }}
                    >
                        Vissza
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { setActiveStep(activeStep + 1); }}
                    >
                        Tovább
                    </Button>
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Foglalás</StepLabel>
                <StepContent>
                <Button
                        variant="contained"
                        onClick={() => { setActiveStep(activeStep - 1); }}
                    >
                        Vissza
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { /* TODO */ }}
                    >
                        Foglalás
                    </Button>
                </StepContent>
            </Step>
        </Stepper>

    </Page>;
}

export default BookingPage;
