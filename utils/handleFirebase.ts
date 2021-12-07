// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc, updateDoc, getDoc, getDocs, arrayUnion, query, where, Timestamp, addDoc, arrayRemove } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//lt --port 3000 --subdomain marvel event

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuMTFKWHubZhVJ3HrwHGfzl51oTA6CMqw",
  authDomain: "marvel-event.firebaseapp.com",
  projectId: "marvel-event",
  storageBucket: "marvel-event.appspot.com",
  messagingSenderId: "1083599294290",
  appId: "1:1083599294290:web:76d7735f27e3cc3f7a748b",
  measurementId: "G-N2M4E4R8R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const storage = getStorage(app);

export const initFirebase =() => {
    try {
        app
        console.log('Firebase was successfully init.')
      } catch(err){
        if (!/already exists/.test(err.message)) {
          console.error('Firebase initialization error', err.stack)}
      }
}

const db = getFirestore()

interface Comment {
  eventID: number;
  userId: string;
  displayName: string;
  pictureUrl: string;
  comment: string;
  date: string;
  time: string;
}

interface Favorite {
  eventID: number;
  userId: string;
  Myfav: boolean;
  eventName: string;
}

export const sendData = (value:Comment) => {
  const saveComment = async (value:Comment) => {
    console.log(value.eventID)// 270
    const docRef = doc(db, "commentsData", `${value.eventID}`); //doc(db, "collection", "document target");
    const docSnap = await getDoc(docRef);
    console.log('fs', value)
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await updateDoc(docRef, {
        userComment: arrayUnion(value)
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(docRef, {
      userComment: [value]
    });
    }
  }
  saveComment(value)
}

export const getData = async (eventID: number) => {
  const getComment = async (eventID: number) => {
    console.log(eventID)// 270
    const docRef = doc(db, "commentsData", `${eventID}`); //doc(db, "collection", "document target");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().userComment);
      const data = docSnap.data()
      return data
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      const data = null
      return data
    }
  }
  // await getComment(eventID)
    console.log(eventID)// 270
    const docRef = doc(db, "commentsData", `${eventID}`); //doc(db, "collection", "document target");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().userComment);
      const data = docSnap.data().userComment
      return data
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      const data = null
      return data
    }
}

export const sendFav = async (Favdata: Favorite) => {
  const saveFav = async (value:Favorite) => {
    console.log(value.eventID)// 270
    const docRef = doc(db, "favoriteData", `${value.eventID}`); //doc(db, "collection", "document target");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await updateDoc(docRef, {
        userFav: arrayUnion(value)
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(docRef, {
      userFav: [value]
    });
    }
  }
  saveFav(Favdata)
}

export const deleteFav = async (Favdata: Favorite) => {
  const removeFav = async (value:Favorite) => {
    console.log(value.eventID)// 270
    const docRef = doc(db, "favoriteData", `${value.eventID}`); //doc(db, "collection", "document target");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("deleteFav data:", docSnap.data());
      const data = docSnap.data().userFav.filter(user => user.userId !== value.userId)
      console.log('data', data)
      await updateDoc(docRef, {
        userFav: data
      });
    }
  }
  removeFav(Favdata)
}

export const allMyFav = async (userID: string) => {
  const citiesRef = collection(db, 'favoriteData');
    const querySnapshot = await getDocs(citiesRef);
    const c =[]
      
    querySnapshot.forEach((doc) => {
      // const getData = {
      //   eventId: doc.id,
      //   userFav: doc.data().userFav
      // }
      // c.push(getData)
      const userFavObj = doc.data().userFav
      // console.log(userFavObj)
      const x =  Object.keys(userFavObj).filter(i => userFavObj[i].userId === userID).reduce( (res, key) => (res[0] = userFavObj[key], res), {} );
      if (x[0] !== undefined){
        c.push(x[0].eventID)
      }
      // console.log(typeof x, x[0])
      // const getData = {
      //   eventId: userFavObj.userId,
      //   userFav: x
      // }
    })
    // console.log('c', c)
     const getData = {
        userId: userID,
        myFav: c
      }
      console.log('1')
      console.log('getData', getData)
      return getData
}

export const getHeroImg = async (eventId:number) => {
  // var ref = ref(storage, 'banner'+'/'+eventId+".jpg");
  const url = await getDownloadURL(ref(storage, 'banner'+'/'+eventId+".jpg"));
  console.log(url)
  return url
}

export const rankEvents = async () => {
  const favRef = collection(db, 'favoriteData');
  const querySnapshot = await getDocs(favRef);
  const arrEvents =[]
    
  querySnapshot.forEach((doc) => {
    const userFavObj = doc.data().userFav
    
    
    if(userFavObj.length !== 0) {
      const getData = {
        eventId: doc.id,
        eventName: userFavObj[0].eventName,
        userFav: userFavObj.length
      }
      arrEvents.push(getData)
    }
  })
  console.log('arrEvents', arrEvents)
  const x = arrEvents.sort(function (a, b) {
    return b.userFav - a.userFav;
  });
  console.log('new arrEvents', x)
  return x
}
