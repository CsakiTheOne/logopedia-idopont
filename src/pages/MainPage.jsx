import { logOut } from '../firebase/auth';

function MainPage() {
    return <>
        <button onClick={() => {
            logOut();
        }}>
            Kijelentkezés
        </button>
    </>;
}

export default MainPage;
