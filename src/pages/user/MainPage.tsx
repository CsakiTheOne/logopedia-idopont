import { useEffect, useState } from 'react';
import { addOnAuthStateChangedListener, getCurrentUser, logOut } from '../../firebase/auth';
import { getAbout } from '../../firebase/rtdb';
import Page from '../../components/Page';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    List,
    Stack,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { User } from 'firebase/auth';
import LoginCard from '../../components/LoginCard';
import banner from '../../media/banner.png';
import WorkDisplay from '../../components/WorkDisplay';
import { getWorks } from '../../firebase/firestore';
import Work from '../../model/Work';

function MainPage() {
    const navigate = useNavigate();
    const [aboutUs, setAboutUs] = useState('');
    const [works, setWorks] = useState<Work[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [selectedWork, setSelectedWork] = useState<Work | null>(null);

    useEffect(() => {
        getAbout(about => setAboutUs(about));
        getWorks(newWorks => setWorks(newWorks));

        setIsLoggedIn(!!getCurrentUser());

        addOnAuthStateChangedListener(user => setIsLoggedIn(!!user));
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
                    style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
                    src={banner}
                    alt='Fanni Logopédia'
                />
            </>
        }
    >
        {
            <Dialog open={selectedWork !== null} onClose={() => setSelectedWork(null)}>
                <DialogTitle>{selectedWork?.title}</DialogTitle>
                <DialogContent dangerouslySetInnerHTML={{ __html: selectedWork ? selectedWork.description.replace("\n", "<br/>") : '' }}></DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedWork(null)} autoFocus>
                        Bezárás
                    </Button>
                </DialogActions>
            </Dialog>
        }
        {
            isLoggedIn ?
                <>
                    <Typography variant='h5'>Fejlesztő eszközök, játékok és könyvek</Typography>
                    <Button onClick={() => navigate('/loan')} variant='contained'>
                        Böngészés
                    </Button>
                    <Typography variant='h5'>Foglalkozásaim</Typography>
                    <Button onClick={() => navigate('/booking')} variant='contained' startIcon={<AddIcon />}>
                        Új foglalkozás időpont kérése
                    </Button>
                </> :
                <>
                    <Typography variant='h5'>Rólam</Typography>
                    <Typography>{aboutUs}</Typography>
                    <Typography variant='h5'>Időpont foglaláshoz és eszköz kölcsönzéshez jelentkezz be!</Typography>
                    <LoginCard />
                    <Typography variant='h5'>Szolgáltatások</Typography>
                    <List>
                        <Stack spacing={2}>
                            {works.map(work => <WorkDisplay
                                work={work}
                                selected={true}
                                onClick={() => { setSelectedWork(work); }}
                            />
                            )}
                        </Stack>
                    </List>
                </>

        }

    </Page>;
}

export default MainPage;
