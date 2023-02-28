import { useEffect, useState } from 'react';
import { logOut } from '../firebase/auth';
import { getAbout } from '../firebase/rtdb';
import Page from './Page';

function MainPage() {
    const [aboutUs, setAboutUs] = useState('');

    useEffect(() => {
        getAbout(about => setAboutUs(about));
    }, []);

    return <Page>
        <button onClick={() => {
            logOut();
        }}>
            Kijelentkezés
        </button>
        <br />
        <p>{aboutUs}</p>
    </Page>;
}

export default MainPage;
