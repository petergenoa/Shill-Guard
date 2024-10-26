declare module '../firebase' {
    import { FirebaseApp } from 'firebase/app';
    import { Analytics } from 'firebase/analytics';
    import { Firestore } from 'firebase/firestore';
    import { Storage } from 'firebase/storage';
  
    const app: FirebaseApp;
    const analytics: Analytics;
    const db: Firestore;
    const storage: Storage;
  
    export { app, analytics, db, storage };
  }