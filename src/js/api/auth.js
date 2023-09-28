import db from '../db/firestore';
import firebase from 'firebase';
import 'firebase/auth';

const createUserProfile = userProfile => 
    db.collection('profiles')
        .doc(userProfile.uid)
        .set(userProfile);

export async function register({ email, password, username, avatar }) {
    try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await createUserProfile({
            uid: user.uid,
            username,
            email,
            avatar,
            joinedChats: []
        });
        return user;
    } catch(err) {
        return Promise.reject(err);
    }
}

export const onAuthStateChanges = onAuth =>
  firebase.auth().onAuthStateChanged(onAuth);