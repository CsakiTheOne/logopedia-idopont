import { app } from './firebase';
import { getDatabase, ref, child, get, set } from 'firebase/database';

const dbRef = ref(getDatabase(app));

const pathAbout = 'meta/about';

function getAbout(callback) {
    get(child(dbRef, pathAbout))
        .then(snapshot => callback(snapshot.val()))
        .catch(error => callback(''));
}

function setAbout(value) {
    set(child(dbRef, pathAbout), value);
}

export {
    getAbout,
    setAbout,
};
