import { app } from './firebase';
import { getCurrentUser } from './auth';
import { getFirestore, doc, getDoc, getDocs, collection, query, where, updateDoc, QueryDocumentSnapshot, DocumentData, DocumentReference, addDoc, deleteDoc } from 'firebase/firestore';
import Work from '../model/Work';

const db = getFirestore(app);

export function userIsAdmin(callback: (isAdmin: boolean) => void) {
    if (getCurrentUser() == null) {
        callback(false);
        return;
    }

    const userUid = getCurrentUser()?.uid;
    if (!userUid) return;

    const docRef = doc(db, 'users', userUid);
    getDoc(docRef)
        .then(snapshot => {
            callback(snapshot.data()?.isAdmin);
        })
        .catch(error => {
            callback(false);
        });
}

export function getWorks(callback: (works: Work[]) => void) {
    getDocs(collection(db, 'works'))
        .then(querySnapshot => {
            const works: Work[] = [];
            querySnapshot.forEach(document => {
                works.push(Work.fromDocumentData(document.data()));
            });
            callback(works);
        })
        .catch(error => {
            console.error(error);
            callback([]);
        });
}

export function updateWork(work: Work, oldTitle: string | undefined, callback: (isSuccesful: boolean) => void) {
    const q = query(collection(db, 'works'), where('title', '==', oldTitle));
    getDocs(q).then(querySnapshot => {
        // If the query returns any documents, update the first one with the new work object
        if (!querySnapshot.empty) {
            updateDoc(querySnapshot.docs[0].ref, { ...work })
                .then(() => callback(true))
                .catch(() => callback(false));
        }
        else {
            addDoc(collection(db, 'works'), { ...work })
                .then(() => callback(true))
                .catch(() => callback(false));
        }
    });
}

export function deleteWork(title: string | undefined, callback: (isSuccesful: boolean) => void) {
    if (!title) {
        callback(false);
        return;
    }

    const q = query(collection(db, 'works'), where('title', '==', title));
    getDocs(q).then(querySnapshot => {
        deleteDoc(querySnapshot.docs[0].ref)
            .then(() => callback(true))
            .catch(() => callback(false));
    });
}
