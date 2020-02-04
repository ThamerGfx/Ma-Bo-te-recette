import Rebase from 're-base';
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBLAHtTEsxmupD3Tohttk-W1GFJJqSQFaQ",
    authDomain: "recette-1b25d.firebaseapp.com",
    databaseURL: "https://recette-1b25d.firebaseio.com"
};
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
export default base;