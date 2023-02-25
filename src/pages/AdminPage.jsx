import { useEffect, useState } from 'react';
import { logOut } from '../firebase/auth';
import { getAbout, setAbout } from '../firebase/rtdb';

function AdminPage() {
    const [aboutUs, setAboutUs] = useState('');

    useEffect(() => {
        getAbout(about => setAboutUs(about));
    }, []);

    return <>
        <p>{'Admin felület'}</p>
        <button onClick={() => {
            logOut();
        }}>
            Kijelentkezés
        </button>
        <br />
        <input
            type="text"
            value={aboutUs}
            onChange={event => {
                setAboutUs(event.target.value);
                setAbout(event.target.value);
            }}
        />
    </>;
}

export default AdminPage;
