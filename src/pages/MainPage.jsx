import { useEffect, useState } from 'react';
import { logOut } from '../firebase/auth';
import { getAbout } from '../firebase/rtdb';

function MainPage() {
    const [aboutUs, setAboutUs] = useState('');

    useEffect(() => {
        getAbout(about => setAboutUs(about));
    }, []);

    return <>
        <button onClick={() => {
            logOut();
        }}>
            Kijelentkezés
        </button>
        <br />
        <p>{aboutUs}</p>
    </>;
}

export default MainPage;
