import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.API_KEY_FIREBASE,
    authDomain: import.meta.env.AUTH_DOMAIN_FIREBASE,
    projectId: "to-do-list-bef22",
    storageBucket: import.meta.env.STORAGE_BUCKET_FIREBASE,
    messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
    appId: import.meta.env.APP_ID_FIREBASE,
    measurementId: import.meta.env.MEASUREMENT_ID_FIREBASE
}

const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)