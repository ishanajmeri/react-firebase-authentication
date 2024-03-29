// import app from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

// const config = {
//   // apiKey: process.env.REACT_APP_API_KEY,
//   // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   // databaseURL: process.env.REACT_APP_DATABASE_URL,
//   // projectId: process.env.REACT_APP_PROJECT_ID,
//   // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   // appId: process.env.REACT_APP_APP_ID,
//   // measurementId: process.env.REACT_APP_MEASUREMENT_ID,
//   apiKey: 'AIzaSyB1amUZXqDr6Qua3xanX5AsJPFrQgMRM0k',
//   authDomain: 'my-firebase-project-568e9.firebaseapp.com',
//   databaseURL: 'https://my-firebase-project-568e9.firebaseio.com',
//   projectId: 'my-firebase-project-568e9',
//   storageBucket: 'my-firebase-project-568e9.appspot.com',
//   messagingSenderId: '689312328719',
//   appId: '1:689312328719:web:2d5fc4001d80c07c5d877a',
//   measurementId: 'G-JQ4GT3GYKE'
// };
// class Firebase {
//   constructor() {
//     app.initializeApp(config);

//     /* Helper */

//     this.serverValue = app.database.ServerValue;
//     this.emailAuthProvider = app.auth.EmailAuthProvider;

//     /* Firebase APIs */

//     this.auth = app.auth();
//     this.db = app.database();

//     /* Social Sign In Method Provider */

//     this.googleProvider = new app.auth.GoogleAuthProvider();
//     this.facebookProvider = new app.auth.FacebookAuthProvider();
//     this.twitterProvider = new app.auth.TwitterAuthProvider();
//   }

//   // *** Auth API ***

//   doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

//   doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

//   doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

//   doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

//   doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

//   doSignOut = () => this.auth.signOut();

//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

//   doSendEmailVerification = () =>
//     this.auth.currentUser.sendEmailVerification({
//       url: 'http://localhost:3000'
//     });

//   doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
//   emailVerified = () => this.auth.currentUser.emailVerified;
//   // *** Merge Auth and DB User API *** //

//   onAuthUserListener = (next, fallback) =>
//     this.auth.onAuthStateChanged(authUser => {
//       if (authUser) {
//         this.user(authUser.uid)
//           .once('value')
//           .then(snapshot => {
//             const dbUser = snapshot.val();

//             // default empty roles
//             if (!dbUser.roles) {
//               dbUser.roles = {};
//             }

//             // merge auth and db user
//             authUser = {
//               uid: authUser.uid,
//               email: authUser.email,
//               emailVerified: authUser.emailVerified,
//               providerData: authUser.providerData,
//               ...dbUser
//             };

//             next(authUser);
//           });
//       } else {
//         fallback();
//       }
//     });

//   // *** User API ***

//   user = uid => this.db.ref(`users/${uid}`);

//   users = () => this.db.ref('users');

//   // *** session API ***

//   session = uid => this.db.ref(`sessions/${uid}`);

//   sessions = () => this.db.ref('sessions');
// }

// export default Firebase;
