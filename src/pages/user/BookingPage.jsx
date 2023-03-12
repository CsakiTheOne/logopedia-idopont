import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { logOut } from '../../firebase/auth';
import { getWorks } from '../../firebase/firestore';
import Page from '../Page';
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
    List,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';

function BookingPage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [works, setWorks] = useState([]);
    const [selectedWorkTitle, setSelectedWorkTitle] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        getWorks(newWorks => {
            setWorks(newWorks);
        });
    }, []);

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
                disabled={props.nextEnabled !== undefined && !!props.nextEnabled === false}
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
                <StepLabel>Foglalkozás: {selectedWorkTitle}</StepLabel>
                <StepContent>
                    <List>
                        {works.map(work => {
                            return <ListItemButton
                                style={{ borderRadius: 8 }}
                                selected={selectedWorkTitle === work.title}
                                onClick={() => {
                                    setSelectedWorkTitle(work.title);
                                }}
                            >
                                <ListItemText primary={`${work.title} - ${work.durationMinutes} perc`} secondary={work.description} />
                            </ListItemButton>;
                        })}
                    </List>
                    <NavigationButtons backLabel='Mégsem' onBackClick={() => navigate('/')} nextEnabled={selectedWorkTitle !== ''} />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Nap</StepLabel>
                <StepContent>
                    <DateCalendar
                        views={['day']}
                        minDate={dayjs().add(1, 'day')}
                        maxDate={dayjs().add(2, 'month')}
                    />
                    <NavigationButtons />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Idő: {selectedTime}</StepLabel>
                <StepContent>
                    <List>
                        <ListItemButton onClick={() => setSelectedTime('12:00')}>
                            <ListItemText primary='12:00' />
                        </ListItemButton>
                        <ListItemButton onClick={() => setSelectedTime('14:00')}>
                            <ListItemText primary='14:00' />
                        </ListItemButton>
                        <ListItemButton onClick={() => setSelectedTime('16:00')}>
                            <ListItemText primary='16:00' />
                        </ListItemButton>
                    </List>
                    <NavigationButtons nextEnabled={selectedTime !== ''} />
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
