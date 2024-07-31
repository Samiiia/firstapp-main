import { Try } from "expo-router/build/views/Try";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  auth, db } from '../../FirebaseConfig';
import {  doc, getDoc, setDoc ,getFirestore} from "firebase/firestore";

export const Authcontext = createContext();

export const AuthContextProvider =({children}) => {
    const [user,setUser]=useState(null);
    const [isAuthenticated, setIsAuthenticated]=useState(undefined);

    useEffect(()=> {
        //onAuthStateChange  from firebase is the user signed in or not?
        const unsub = onAuthStateChanged(auth, (user)=> {
            // console.log('got user',user);
            if (user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[]);

    
    const updateUserData = async(userId)=>{
        const docRef = doc(db, 'users' , userId);
        const docSnap = await getDoc(docRef);
         
        if (docSnap.exists()){
            
            let data = docSnap.data();
            setUser({...user, username: data.username , userId: data.userId, email: data.email })
        }
    }


    const signin=async(email,password)=>{
       try {
        const response = await signInWithEmailAndPassword(auth,email,password);
        return {success:true};
       } catch (e) {
        let msg = e.message; 
        if (msg.includes(' (auth/invalid-email)')) msg ='invalid Email'
        if (msg.includes(' (auth/invalid-credential)')) msg ='Wrong credential'
        return{success:false, msg};
       }
    }

    const signup =async(email,password,username)=>{
        try {
         const response = await createUserWithEmailAndPassword(auth, email , password);
         console.log('response.user:',response?.user);
        //  setUser(response?.user);
        //  setIsAuthenticated(true);
        //create collection to store username profile

        await setDoc(doc(db,"users", response?.user?.uid),{
          username,
          email,
          userId:response?.user?.uid

        })
        return{success:true, data:response?.user};

        } catch (e) {
            let msg = e.message; 
            if (msg.includes(' (auth/invalid-email)')) msg ='invalid Email'
            if (msg.includes(' (auth/email-already-in-use)')) msg ='This email is already in use'  
         return{success:false, msg};
        }
     }

    const signout=async()=>{
        try {
            await signOut(auth);
            return{success:true};
        } catch (e) {
         return {success:false,msg:e.message, error:e};
        }
     }

     return(
        <Authcontext.Provider value={{user, isAuthenticated, signin, signup, signout}}>
            {children}
        </Authcontext.Provider>
     )
}

//
export const useAuth =()=>{
    const value = useContext(Authcontext);
    if(!value){
        throw new Error ('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}