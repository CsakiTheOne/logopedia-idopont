import { logOut } from '../firebase/auth';
import store from '../store';

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
