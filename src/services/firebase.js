import firebase from 'firebase'

const config ={
    apiKey: "AIzaSyAvMeNIPUAajkOyva0ANFMbn2KyVmzEyGU",
    authDomain: "techietainment-salary.firebaseapp.com",
    databaseURL: "https://techietainment-salary.firebaseio.com"
}

firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database()