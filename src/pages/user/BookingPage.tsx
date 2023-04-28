import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { logOut } from '../../firebase/auth';
import { getWorks } from '../../firebase/firestore';
import Page from '../../components/Page';
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
import React from 'react';
import Work from '../../model/Work';
import WorkDisplay from '../../components/WorkDisplay';

function BookingPage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [works, setWorks] = useState<Work[]>([]);
    const [times, setTimes] = useState<string[]>(['12:00', '14:00', '16:00']);
    const [selectedWorkTitle, setSelectedWorkTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        getWorks(newWorks => {
            setWorks(newWorks);
        });
    }, []);

    function NavigationButtons(props: any) {
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
                        {works.map(work => <WorkDisplay
                            showTime
                            work={work}
                            selected={selectedWorkTitle === work.title}
                            onClick={() => {
                                setSelectedWorkTitle(work.title);
                            }}
                        />
                        )}
                    </List>
                    <NavigationButtons backLabel='Mégsem' onBackClick={() => navigate('/')} nextEnabled={selectedWorkTitle !== ''} />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Nap</StepLabel>
                <StepContent>
                    <DateCalendar
                        views={['day']}
                        minDate={dayjs().add(2, 'day')}
                        maxDate={dayjs().add(2, 'month')}
                        onChange={event => {
                            const date = event?.format('YYYY-MM-DD');
                            if (date) setSelectedDate(date);
                        }}
                    />
                    <NavigationButtons nextEnabled={selectedDate !== ''} />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Idő: {selectedTime}</StepLabel>
                <StepContent>
                    <Typography>
                        {works.find(w => w.title === selectedWorkTitle)?.durationMinutes} perces foglalkozást választottál.
                    </Typography>
                    <Typography>
                        Elérhető időpontok {selectedDate} dátumra:
                    </Typography>
                    <List>
                        {times.map(time => {
                            return <ListItemButton
                                selected={selectedTime === time}
                                onClick={() => {
                                    setSelectedTime(time);
                                }}
                            >
                                <ListItemText primary={`🕑 ${time}`} />
                            </ListItemButton>;
                        })}
                    </List>
                    <NavigationButtons nextEnabled={selectedTime !== ''} />
                </StepContent>
            </Step>
            <Step>
                <StepLabel>Foglalás</StepLabel>
                <StepContent>
                    <Typography>Foglalkozás: {selectedWorkTitle}</Typography>
                    <Typography>Dátum: {selectedDate}</Typography>
                    <Typography>Idő: {selectedTime}</Typography>
                    <NavigationButtons nextLabel='Foglalás' onNextClick={() => { }} />
                </StepContent>
            </Step>
        </Stepper>

    </Page>;
}

export default BookingPage;
