import { logOut } from '../firebase/auth';

function AdminPage() {
    return <>
        <p>{'Admin felület'}</p>
        <button onClick={() => {
            logOut();
        }}>
            Kijelentkezés
        </button>
    </>;
}

export default AdminPage;
