import { Button } from 'flowbite-react'
import React from 'react'
import { GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const auth = getAuth(app); // This is the firebase app we created in firebase.js

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // For this we need to add firebase google auth
  const handleGoogleClick =async () => {

    const provider = new GoogleAuthProvider();
    // We need to add custom provider . Otherwise always it sign in same google account.
    provider.setCustomParameters({prompt: 'select_account'});
    try{
        const resultsFromGoogle = await signInWithPopup(auth, provider);
        const res = await fetch('/api/auth/google',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : resultsFromGoogle.user.displayName,
                email : resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL
            })
        })

        const data = await res.json();
        if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/');

        }


    }catch(err){
        console.log(err);

    }

  }
    
  return (
    
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
      
    
  )
}

export default OAuth