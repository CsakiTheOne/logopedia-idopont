import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
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
    Stack,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { Navigate, useNavigate } from 'react-router-dom';

function BookingPage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    function NavigationButtons(props) {
        return <Stack direction='row' justifyContent='flex-end' spacing={2}>
            <Button
                onClick={() => {
                    if (props.onBackClick === undefined) {
                        setActiveStep(activeStep - 1);
                    }
                    else props.onBackClick();
                }}
            >
                {props.backLabel === undefined ? 'Vissza' : props.backLabel}
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    if (props.onNextClick === undefined) {
                        setActiveStep(activeStep + 1);
                    }
                    else props.onNextClick();
                }}
            >
                {props.nextLabel === undefined ? 'Tovább' : props.nextLabel}
            </Button>
        </Stack>
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
        <Typography variant='h5'>Időpont foglalás</Typography>

        <Stepper activeStep={activeStep} orientation='vertical'>
            <Step>
                <StepLabel>Foglalkozás</StepLabel>
                <StepContent>
                    <Typography>Foglalkozások listája</Typography>
                    <NavigationButtons backLabel='Mégsem' onBackClick={() => navigate('/')} />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Nap</StepLabel>
                <StepContent>
                    <DateCalendar
                        minDate={dayjs().add(1, 'day')}
                        maxDate={dayjs().add(2, 'month')}
                    />
                    <NavigationButtons />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Idő</StepLabel>
                <StepContent>
                    <Typography>Szabad időpontok listája</Typography>
                    <NavigationButtons />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Foglalás</StepLabel>
                <StepContent>
                    <Typography>Összefoglalás küldés előtt</Typography>
                    <NavigationButtons nextLabel='Foglalás' onNextClick={() => { }} />
                </StepContent>
            </Step>
        </Stepper>

    </Page>;
}

export default BookingPage;
