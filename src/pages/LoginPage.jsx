import { useState } from 'react';
import { register, logIn, logInGoogle } from '../firebase/auth';
import store from '../store';
import Page from './Page';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <Page>
        <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
        <br />
        <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        <br />
        <button onClick={() => {
            register(email, password);
        }}>
            Regisztrálás
        </button>
        <button onClick={() => {
            logIn(email, password);
        }}>
            Bejelentkezés
        </button>
        <br />
        <button onClick={() => {
            logInGoogle();
        }}>Bejelentkezés gyorsan, Google-el</button>
    </Page>;
}

export default LoginPage;
