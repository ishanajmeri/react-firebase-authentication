import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyB1amUZXqDr6Qua3xanX5AsJPFrQgMRM0k',
  authDomain: 'my-firebase-project-568e9.firebaseapp.com',
  databaseURL: 'https://my-firebase-project-568e9.firebaseio.com',
  projectId: 'my-firebase-project-568e9',
  storageBucket: 'my-firebase-project-568e9.appspot.com',
  messagingSenderId: '689312328719',
  appId: '1:689312328719:web:2d5fc4001d80c07c5d877a',
  measurementId: 'G-JQ4GT3GYKE'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
