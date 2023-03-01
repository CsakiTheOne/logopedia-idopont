import { useEffect, useState } from 'react';
import { logOut } from '../firebase/auth';
import { getAbout, setAbout } from '../firebase/rtdb';
import Page from './Page';

function AdminPage() {
    const [aboutUs, setAboutUs] = useState('');

    useEffect(() => {
        getAbout(about => setAboutUs(about));
    }, []);

    return <Page>
        <h3>Admin felület</h3>
        <button onClick={() => {
            logOut();
        }}>
            Kijelentkezés
        </button>
        <h3>Időpont beállítások</h3>
        <p>Munkaidő kezdete:</p>
        <button>10:00</button>
        <p>Munkaidő vége:</p>
        <button>20:00</button>
        <p>Felkészülési idő foglalkozások között:</p>
        <button>00:30</button>
        <h3>Rólam</h3>
        <textarea
            cols="32"
            rows="8"
            value={aboutUs}
            onChange={event => {
                setAboutUs(event.target.value);
                setAbout(event.target.value);
            }}
        ></textarea>
    </Page>;
}

export default AdminPage;
